package com.sorsix.raeda.service

import com.sorsix.raeda.api.response.LocationResponse
import com.sorsix.raeda.api.response.RentalResponse
import com.sorsix.raeda.domain.Location
import com.sorsix.raeda.domain.Rental
import com.sorsix.raeda.repository.RentalRepository
import org.springframework.stereotype.Service

@Service
class RentalService(
    private val rentalRepository: RentalRepository) {

    fun getAllRentals(): List<RentalResponse> =
        this.rentalRepository.findAll().map {
            it.toRentalResponse()
        }

    fun Rental.toRentalResponse() = RentalResponse(
        rentalID = this.rentalID,
        pickupTime = this.pickupTime,
        dropOffTime = this.dropOffTime,
        car = this.car,
        location = this.location.toLocationResponse(),
        rentalDuration = this.rentalDuration,
        totalPrice = this.totalPrice
    )

    fun Location.toLocationResponse() = LocationResponse(
        locationId = this.locId,
        locationName = this.locationName,
        locationAddress = this.locationAddress
    )
}