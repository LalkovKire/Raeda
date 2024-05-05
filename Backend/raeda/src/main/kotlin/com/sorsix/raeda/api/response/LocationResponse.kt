package com.sorsix.raeda.api.response

import org.jetbrains.annotations.NotNull

data class LocationResponse(

    @NotNull
    val locationAddress: String,

    @NotNull
    val locationName: String
)