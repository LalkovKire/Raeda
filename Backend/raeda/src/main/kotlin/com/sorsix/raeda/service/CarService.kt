package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.CarRequest
import com.sorsix.raeda.api.requests.RentalRequest
import com.sorsix.raeda.api.response.CarResponse
import com.sorsix.raeda.api.response.LocationResponse
import com.sorsix.raeda.api.response.RentalResponse
import com.sorsix.raeda.domain.Car
import com.sorsix.raeda.domain.Location
import com.sorsix.raeda.domain.Rental
import com.sorsix.raeda.domain.enumerations.CarStatus
import com.sorsix.raeda.repository.CarRepository
import com.sorsix.raeda.repository.RentalRepository
import com.sorsix.raeda.repository.UserRepository
import com.sorsix.raeda.service.exceptions.*
import jakarta.transaction.Transactional
import org.hibernate.query.SortDirection
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.net.MalformedURLException
import java.net.URL
import java.time.Duration
import java.time.LocalDateTime

@Service
class CarService(
    private val carRepository: CarRepository,
    private val userRepository: UserRepository,
    private val locationService: LocationService,
    private val rentalRepository: RentalRepository,
) {

    fun getAllCars(pageable: Pageable): Page<CarResponse> {
        val carsPage: Page<Car> = carRepository.findAll(pageable)
        return carsPage.map { it.toCarResponse() }
    }

    fun getCarById(id: Long) = carRepository.findByIdOrNull(id)
        ?: throw CarNotFoundException(id)

    @Transactional
    fun addCar(car: CarRequest): CarResponse {

        val location = this.locationService.getLocationById(car.locationID)

        if (checkLicencePlate(car.licensePlate)) {
            val fetchCar = this.carRepository.getCarByLicensePlate(car.licensePlate)
            throw LicencePlateRegisteredException(fetchCar.carID, car.licensePlate)
        }

        if(!this.isUrlValid(car.image))
            throw WrongUrlFormatException()

        return this.carRepository.save(
            Car(
                0L,
                car.image,
                car.gearBox,
                car.model,
                car.licensePlate,
                car.yearMade,
                car.seats,
                CarStatus.AVAILABLE,
                car.price,
                car.engine,
                car.carType,
                car.doors,
                car.fuelType,
                car.brand,
                location
            )
        ).toCarResponse()
    }

    fun getLatestInventory() = this.carRepository.getLatestInventory()

    fun deleteCar(id: Long) : CarResponse {
        val tmp = this.getCarById(id)
        this.carRepository.deleteById(id)
        return tmp.toCarResponse()
    }

    @Transactional
    fun rentCar(rental: RentalRequest): RentalResponse {
        val user = this.userRepository.findByEmail(rental.userEmail)
            ?: throw UserNotFoundByEmailException(rental.userEmail)

        val car = this.getCarById(rental.carID)

        if (car.status != CarStatus.AVAILABLE)
            throw CarNotAvailableException(car.carID)

        val location = this.locationService.getLocationById(rental.locationID)
        val rentalDuration =
            calculateRentalDuration(rental.pickupTime, rental.dropOffTime)

        val rent = this.rentalRepository.save(
            Rental(
                0L,
                rental.pickupTime,
                rental.dropOffTime,
                calcPrice(rentalDuration, car.price),
                rentalDuration,
                user,
                car,
                location
            )
        )

        updateCarStatus(car.carID)
        return rent.toRentalResponse()
    }

    fun checkLicencePlate(licensePlate: String) =
        this.carRepository.existsByLicensePlate(licensePlate)

    @Transactional
    fun editCar(id: Long, car: CarRequest): CarResponse {

        val fetchCar = this.getCarById(id)
        val fetchLocation = this.locationService.getLocationById(car.locationID)

        fetchCar.apply {
            this.image = car.image
            this.gearBox = car.gearBox
            this.model = car.model
            this.licensePlate = car.licensePlate
            this.yearMade = car.yearMade
            this.seats = car.seats
            this.price = car.price
            this.engine = car.engine
            this.carType = car.carType
            this.doors = car.doors
            this.fuelType = car.fuelType
            this.brand = car.brand
            this.location = fetchLocation
        }

        return this.carRepository.save(fetchCar).toCarResponse()
    }

    fun calculateRentalDuration(pickupDate: LocalDateTime, dropoffDate: LocalDateTime): Int {
        val duration = Duration.between(pickupDate, dropoffDate)
        return if (duration.toDays() > 2)
            1
        else duration.toDays().toInt()
    }

    fun findExpiredRentals(): List<Rental> {
        val currentTime = LocalDateTime.now()
        return rentalRepository.findExpiredRentals(currentTime)
    }

    fun updateCarStatus(carID: Long) {
        val tmp = this.getCarById(carID)
        if (tmp.status == CarStatus.RENTED)
            tmp.status = CarStatus.AVAILABLE
        else
            tmp.status = CarStatus.RENTED

        this.carRepository.save(tmp)
    }

    fun calcPrice(rentalDuration: Int, price: Int) = rentalDuration * price

    fun Rental.toRentalResponse() = RentalResponse(
        pickupTime = pickupTime,
        dropOffTime = dropOffTime,
        rentalID = rentalID,
        car = car,
        location = location,
        rentalDuration = rentalDuration,
        totalPrice = totalPrice
    )

   fun Car.toCarResponse() = CarResponse(
        carID, image, gearBox,
        model, licensePlate, yearMade,
        seats, status, price,
        engine, carType, doors,
        fuelType, brand, location.toLocationResponse()
    )
    fun Location.toLocationResponse() = LocationResponse(
        locationId = locId,
        locationAddress = locationAddress,
        locationName = locationName
    )
    fun filterCars(filters: Map<String, String>): Page<CarResponse> {
        val page = filters["page"]?.toIntOrNull() ?: 0
        val size = filters["size"]?.toIntOrNull() ?: 10
        val pageable = PageRequest.of(page,size, Sort.by(Sort.Direction.ASC, "carid"))
        val location = filters["location"]
        // val pickupDate = filters["pickupDate"]
        val price = filters["price"]?.toIntOrNull()
        val brand = filters["brand"]?.split(',') ?: emptyList()
        val year = filters["year"]?.split(",")?.map { it.toInt() } ?: emptyList()
        val fuel = filters["fuel"]
        val gear = filters["gear"]
        val availableOnly = if (filters["availableOnly"] == "true") 0 else null

        return this.carRepository.getCarByFiltering(location, price, brand, year, fuel, gear, availableOnly,pageable)
            .map { it.toCarResponse() }
    }

    private fun isUrlValid(url: String) : Boolean {
        return try {
            URL(url).toURI()
            true
        } catch (e : MalformedURLException) {
            false
        }
    }

}