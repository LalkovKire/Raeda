package com.sorsix.raeda.service.impl

import com.sorsix.raeda.api.requests.CarRequest
import com.sorsix.raeda.domain.Car
import com.sorsix.raeda.domain.enumerations.CarStatus
import com.sorsix.raeda.repository.CarRepository
import com.sorsix.raeda.service.CarService
import com.sorsix.raeda.service.exceptions.CarNotFoundException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class CarServiceImpl(
    private val carRepository: CarRepository
) : CarService {

    override fun getAllCars(): List<Car> = this.carRepository.findAll()

    override fun getCarById(id: Long) = carRepository.findByIdOrNull(id) ?: throw CarNotFoundException(id)

    override fun addCar(car: CarRequest): Car {
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
                car.brand
            )
        )
    }

    override fun deleteCar(id: Long) = this.carRepository.deleteById(id)

    override fun editCar(id: Car): Car {
        TODO("Not yet implemented")
    }

}