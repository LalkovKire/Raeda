package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.CarRequest
import com.sorsix.raeda.api.requests.RentalRequest
import com.sorsix.raeda.domain.Car
import com.sorsix.raeda.domain.Location
import com.sorsix.raeda.domain.enumerations.CarStatus
import com.sorsix.raeda.repository.CarRepository
import com.sorsix.raeda.service.exceptions.CarNotFoundException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class CarService(
    private val carRepository: CarRepository
) {

    fun getAllCars(): List<Car> = this.carRepository.findAll()

    fun getCarById(id: Long) = carRepository.findByIdOrNull(id) ?: throw CarNotFoundException(id)

    fun addCar(car: CarRequest): Car {
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
                Location(0L, "somewhere","test")
            )
        )
    }

    fun getLatestInventory() = this.carRepository.getLatestInventory()

    fun deleteCar(id: Long) = this.carRepository.deleteById(id)

    fun rentCar(rental: RentalRequest) {

    }

    fun editCar(id: Car): Car {
        TODO("Not yet implemented")
    }

}