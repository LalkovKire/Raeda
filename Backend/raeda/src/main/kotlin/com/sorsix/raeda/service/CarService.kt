package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.CarRequest
import com.sorsix.raeda.api.requests.RentalRequest
import com.sorsix.raeda.api.response.CarResponse
import com.sorsix.raeda.api.response.RentalResponse
import com.sorsix.raeda.domain.Car
import com.sorsix.raeda.domain.Rental
import com.sorsix.raeda.domain.enumerations.CarStatus
import com.sorsix.raeda.repository.CarRepository
import com.sorsix.raeda.repository.RentalRepository
import com.sorsix.raeda.repository.UserRepository
import com.sorsix.raeda.service.exceptions.CarNotAvailableException
import com.sorsix.raeda.service.exceptions.CarNotFoundException
import com.sorsix.raeda.service.exceptions.LicencePlateRegisteredException
import com.sorsix.raeda.service.exceptions.UserNotFoundByEmailException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.time.Duration
import java.time.LocalDateTime

@Service
class CarService(
    private val carRepository: CarRepository,
    private val userRepository: UserRepository,
    private val locationService: LocationService,
    private val rentalRepository: RentalRepository
) {

    fun getAllCars(): List<Car> = this.carRepository.findAll()

    fun getCarById(id: Long) = carRepository.findByIdOrNull(id) ?: throw CarNotFoundException(id)

    fun addCar(car: CarRequest): CarResponse {

        val location = this.locationService.getLocationById(car.locationID)

        if (checkLicencePlate(car.licensePlate)) {
            val fetchCar = this.carRepository.getCarByLicensePlate(car.licensePlate)
            throw LicencePlateRegisteredException(fetchCar.carID, car.licensePlate)
        }

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

    fun deleteCar(id: Long) = this.carRepository.deleteById(id)

    fun rentCar(rental: RentalRequest) : RentalResponse {
        val user = this.userRepository.findByEmail(rental.userEmail)
            ?: throw UserNotFoundByEmailException(rental.userEmail)

        val car = this.getCarById(rental.carID)

        if (car.status != CarStatus.AVAILABLE)
            throw CarNotAvailableException(car.carID)

        val location = this.locationService.getLocationById(rental.locationID)
        val rentalDuration = calculateRentalDuration(rental.pickupTime, rental.dropOffTime)

        val rent = this.rentalRepository.save(Rental(
            0L,
            rental.pickupTime,
            rental.dropOffTime,
            calcPrice(rentalDuration,car.price),
            rentalDuration,
            user,
            car,
            location
        ))

        updateCarStatus(car.carID)
        return rent.toRentalResponse()
    }

    fun checkLicencePlate(licensePlate: String) =
        this.carRepository.existsByLicensePlate(licensePlate)

    fun editCar(id: Car): Car {
        TODO("Not yet implemented")
    }

    fun calculateRentalDuration(pickupDate: LocalDateTime, dropoffDate: LocalDateTime) : Int {
        val duration = Duration.between(pickupDate,dropoffDate)
        return if (duration.toDays() > 2)
            1
        else duration.toDays().toInt()
    }

    fun updateCarStatus(carID: Long) {
        var tmp = this.getCarById(carID)
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
        fuelType, brand, location
    )
}