package com.sorsix.raeda.api.controller

import com.sorsix.raeda.api.requests.LocationRequest
import com.sorsix.raeda.api.response.LocationResponse
import com.sorsix.raeda.domain.Location
import com.sorsix.raeda.service.LocationService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/loc")
class LocationController(private val locationService: LocationService){

    @GetMapping
    fun getAllLocation() =
        ResponseEntity(this.locationService.getAllLocations(), HttpStatus.OK)

    @GetMapping("/{id}")
    fun getLocationById(@PathVariable id: Long) =
        this.locationService.getLocationById(id).toLocationResponse()

    @PostMapping
    fun saveNewLocation(@RequestBody loc: LocationRequest) =
        this.locationService.saveNewLocation(loc)

    @PutMapping("/edit/{id}")
    fun editLocation(@PathVariable id: Long, @RequestBody @Validated loc: LocationRequest) =
        this.locationService.editLocation(id,loc)

    @DeleteMapping("/{id}")
    fun deleteLocation(@PathVariable id: Long) =
        this.locationService.deleteLocation(id)

    private fun Location.toLocationResponse() = LocationResponse(
        locationId = this.locId,
        locationName = this.locationName,
        locationAddress = this.locationAddress
    )
}