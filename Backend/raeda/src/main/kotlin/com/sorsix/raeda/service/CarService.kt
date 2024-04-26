package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.CarRequest
import com.sorsix.raeda.domain.Car

interface CarService {

    fun getAllCars() : List<Car>

    fun getCarById(id: Long) : Car

    fun addCar(car: CarRequest) : Car

    fun deleteCar(id: Long) : Unit

    fun editCar(id: Car) : Car
}