package com.sorsix.raeda.api.controllerAdvice

import com.sorsix.raeda.domain.errorResponse.AlreadyExistsError
import com.sorsix.raeda.domain.errorResponse.NotFoundError
import com.sorsix.raeda.service.exceptions.UserAlreadyExistsException
import com.sorsix.raeda.service.exceptions.UserNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class UserControllerAdvice : ResponseEntityExceptionHandler() {

    @ExceptionHandler(UserNotFoundException::class)
    fun handleUserNotFound(e : UserNotFoundException) =
        ResponseEntity(NotFoundError(description = "The user with id ${e.id} was not found"), HttpStatus.NOT_FOUND)

    @ExceptionHandler(UserAlreadyExistsException::class)
    fun handleUserAlreadyExists(e : UserAlreadyExistsException) =
        ResponseEntity(AlreadyExistsError(description = "The user with email: ${e.email} already exists in the database"), HttpStatus.BAD_REQUEST)
}