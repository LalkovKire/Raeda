package com.sorsix.raeda.api.controller

import com.sorsix.raeda.api.requests.CarRequest
import com.sorsix.raeda.api.requests.RentalRequest
import com.sorsix.raeda.api.response.CarResponse
import com.sorsix.raeda.api.response.LocationResponse
import com.sorsix.raeda.domain.Car
import com.sorsix.raeda.domain.Location
import com.sorsix.raeda.service.CarService
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/cars")
class CarController(private val carService: CarService) {

    @GetMapping
    fun getAllCars(@PageableDefault(size = 15) pageable: Pageable) =
        this.carService.getAllCars(pageable)

    @GetMapping("/{id}")
    fun getCarById(@PathVariable id: Long) =
        this.carService.getCarById(id).toCarResponse()

    @PostMapping
    fun addNewCar(@RequestBody @Validated car: CarRequest) =
        this.carService.addCar(car)

    @DeleteMapping("/{id}")
    fun deleteCarById(@PathVariable id: Long) =
        this.carService.deleteCar(id)

    @GetMapping("/latest")
    fun getLatestInventory() =
        this.carService.getLatestInventory()

    @PostMapping("/rent")
    fun rentCar(@RequestBody @Validated rental: RentalRequest) =
        carService.rentCar(rental)

    @GetMapping("/filter")
    fun filterCars(@RequestParam params: Map<String, String>) =
        ResponseEntity(this.carService.filterCars(params), HttpStatus.OK)

    @PutMapping("/edit/{id}")
    fun editCarById(@PathVariable id: Long,@RequestBody @Validated car: CarRequest) =
        ResponseEntity(this.carService.editCar(id, car), HttpStatus.OK)

    private fun Car.toCarResponse() = CarResponse(
        carID, image, gearBox,
        model, licensePlate, yearMade,
        seats, status, price,
        engine, carType, doors,
        fuelType, brand, location.toLocationResponse()
    )

    private fun Location.toLocationResponse() = LocationResponse(
        locationId = locId,
        locationAddress = locationAddress,
        locationName = locationName
    )
}