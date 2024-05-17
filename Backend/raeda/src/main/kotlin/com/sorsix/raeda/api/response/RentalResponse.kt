package com.sorsix.raeda.api.response

import com.sorsix.raeda.domain.Car
import com.sorsix.raeda.domain.Location
import java.time.LocalDateTime

data class RentalResponse (
    val rentalID: Long,
    val pickupTime: LocalDateTime,
    val dropOffTime: LocalDateTime,
    val car: Car,
    val rentalDuration: Int,
    val totalPrice: Int,
    val location: LocationResponse
)