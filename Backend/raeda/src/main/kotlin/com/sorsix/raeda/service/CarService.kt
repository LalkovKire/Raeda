package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.CarDto
import com.sorsix.raeda.domain.Car

interface CarService {

    fun getAllCars() : List<Car>

    fun getCarById(id: Long) : Car

    fun addCar(car: CarDto) : Car

    fun deleteCar(id: Long) : Unit

    fun editCar(id: Car) : Car
}