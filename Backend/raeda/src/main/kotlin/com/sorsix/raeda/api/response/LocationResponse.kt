package com.sorsix.raeda.api.response

import org.jetbrains.annotations.NotNull

data class LocationResponse(

    @NotNull
    val locationSite: String,

    @NotNull
    val locationName: String
)