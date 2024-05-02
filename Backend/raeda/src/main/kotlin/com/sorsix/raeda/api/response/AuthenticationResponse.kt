package com.sorsix.raeda.api.response

data class AuthenticationResponse(
    val accessToken: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val phoneNumber: String
)