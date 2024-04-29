package com.sorsix.raeda.api.requests

import org.jetbrains.annotations.NotNull

data class CarRequest(
    @NotNull
    val image: String,

    @NotNull
    val gearBox: String,

    @NotNull
    val model: String,

    @NotNull
    val licensePlate: String,

    @NotNull
    val yearMade: Int,

    @NotNull
    val seats: Int,

    @NotNull
    val price: Int,

    @NotNull
    val engine: String,

    @NotNull
    val carType: String,

    @NotNull
    var doors: Int,

    @NotNull
    var fuelType: String,

    @NotNull
    var brand: String
)