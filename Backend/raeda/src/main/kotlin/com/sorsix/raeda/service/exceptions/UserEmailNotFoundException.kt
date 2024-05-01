package com.sorsix.raeda.service.exceptions

class UserEmailNotFoundException(val email: String) : RuntimeException()