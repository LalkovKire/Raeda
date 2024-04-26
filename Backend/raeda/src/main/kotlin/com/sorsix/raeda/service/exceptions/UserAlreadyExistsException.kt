package com.sorsix.raeda.service.exceptions

import java.lang.RuntimeException

class UserAlreadyExistsException(val email: String) : RuntimeException()