package com.sorsix.raeda.api.controller

import com.sorsix.raeda.api.requests.CarRequest
import com.sorsix.raeda.api.requests.RentalRequest
import com.sorsix.raeda.api.response.CarResponse
import com.sorsix.raeda.api.response.RentalResponse
import com.sorsix.raeda.service.CarService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/cars")
class CarController(private val carService: CarService) {

    @GetMapping
    fun getAllCars() = ResponseEntity(this.carService.getAllCars(), HttpStatus.OK)

    @GetMapping("/{id}")
    fun getCarById(@PathVariable id: Long) = ResponseEntity(this.carService.getCarById(id), HttpStatus.OK)

    @PostMapping
    fun addNewCar(@RequestBody @Validated car: CarRequest) = ResponseEntity(this.carService.addCar(car), HttpStatus.OK)

    @DeleteMapping("/{id}")
    fun deleteCarById(@PathVariable id: Long) = ResponseEntity(this.carService.deleteCar(id), HttpStatus.OK)

    @GetMapping("/latest")
    fun getLatestInventory() = ResponseEntity(this.carService.getLatestInventory(), HttpStatus.OK)

    @PostMapping("/rent")
    fun rentCar(@RequestBody @Validated rental: RentalRequest): RentalResponse {
        return this.carService.rentCar(rental)
    }

    @GetMapping("/filter")
    fun filterCars(@RequestParam filters: Map<String, String>) =
        ResponseEntity(this.carService.filterCars(filters), HttpStatus.OK)
}