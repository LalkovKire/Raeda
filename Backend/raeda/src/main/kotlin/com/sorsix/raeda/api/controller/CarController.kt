package com.sorsix.raeda.api.controller

import com.sorsix.raeda.api.requests.CarRequest
import com.sorsix.raeda.api.requests.RentalRequest
import com.sorsix.raeda.service.CarService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.validation.annotation.Validated
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
    fun addNewCar(@RequestBody @Validated car: CarRequest) = ResponseEntity(this.carService.addCar(car),HttpStatus.OK)

    @DeleteMapping("/{id}")
    fun deleteCarById(@PathVariable id: Long) = ResponseEntity(this.carService.deleteCar(id),HttpStatus.OK)

    @GetMapping("/latest")
    fun getLatestInventory() = ResponseEntity(this.carService.getLatestInventory(),HttpStatus.OK)

   @PostMapping("/rent")
   fun rentCar(@RequestBody @Validated rental: RentalRequest) {
      this.carService.rentCar(rental)
   }
}