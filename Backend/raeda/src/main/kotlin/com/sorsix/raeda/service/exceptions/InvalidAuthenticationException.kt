package com.sorsix.raeda.service.exceptions

class InvalidAuthenticationException(val cred: String) : RuntimeException()