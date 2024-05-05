package com.sorsix.raeda.api.controller

import com.sorsix.raeda.api.requests.LocationRequest
import com.sorsix.raeda.api.response.LocationResponse
import com.sorsix.raeda.service.LocationService
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
@RequestMapping("/api/loc")
class LocationController(private val locationService: LocationService){

    @GetMapping
    fun getAllLocation() =
        ResponseEntity(this.locationService.getAllLocations(), HttpStatus.OK)

    @GetMapping("/{id}")
    fun getLocationById(@PathVariable id: Long) : ResponseEntity<LocationResponse> {
        val loc = this.locationService.getLocationById(id)
        return ResponseEntity(LocationResponse(loc.locationAddress,loc.locationName),HttpStatus.OK)
    }

    @PostMapping
    fun saveNewLocation(@RequestBody loc: LocationRequest) =
        ResponseEntity(this.locationService.saveNewLocation(loc),HttpStatus.OK)

    @DeleteMapping("/{id}")
    fun deleteLocation(@PathVariable id: Long) =
        ResponseEntity(this.locationService.deleteLocation(id), HttpStatus.OK)
}