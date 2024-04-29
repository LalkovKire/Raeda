package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.LocationRequest
import com.sorsix.raeda.api.response.LocationResponse
import com.sorsix.raeda.domain.Location
import com.sorsix.raeda.repository.LocationRepository
import com.sorsix.raeda.service.exceptions.LocationNotFoundException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class LocationService(private val locationRepository: LocationRepository) {

    fun getAllLocations() = this.locationRepository.findAll().map {
        LocationResponse(locationName = it.locationName, locationSite = it.locationAddress)
    }

    fun getLocationById(id: Long) : LocationResponse {
        val tmp = this.locationRepository.findByIdOrNull(id) ?: throw LocationNotFoundException(id)
        return LocationResponse(locationSite = tmp.locationAddress, locationName = tmp.locationName)
    }

    fun deleteLocation(id: Long) = this.locationRepository.deleteById(id)

    fun saveNewLocation(newLocation: LocationRequest) : LocationResponse {
        val tmp = this.locationRepository.save(Location(0L,newLocation.locationAddress,newLocation.locationName))
        return LocationResponse(locationSite = tmp.locationAddress, locationName = tmp.locationName)
    }

}