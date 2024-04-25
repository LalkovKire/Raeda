package com.sorsix.raeda.api

import com.sorsix.raeda.api.requests.CarDto
import com.sorsix.raeda.service.CarService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/cars")
class CarController(private val carService: CarService) {

    @GetMapping
    fun getAllCars() = ResponseEntity(this.carService.getAllCars(),HttpStatus.OK)

    @GetMapping("/{id}")
    fun getCarById(@PathVariable id: Long) = ResponseEntity(this.carService.getCarById(id),HttpStatus.OK)

    @PostMapping
    fun addNewCar(@RequestBody car: CarDto) = ResponseEntity(this.carService.addCar(car),HttpStatus.OK)

    @DeleteMapping("/{id}")
    fun deleteCarById(@PathVariable id: Long) = ResponseEntity(this.carService.deleteCar(id),HttpStatus.OK)
}