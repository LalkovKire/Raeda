package com.sorsix.raeda.api.controllerAdvice

import com.sorsix.raeda.domain.errorResponse.NotFoundError
import com.sorsix.raeda.service.exceptions.CarNotFoundException
import com.sorsix.raeda.service.exceptions.LocationNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class CarControllerAdvice : ResponseEntityExceptionHandler()  {

    @ExceptionHandler(CarNotFoundException::class)
    fun handleCarNotFound(e : CarNotFoundException) =
        ResponseEntity(NotFoundError(description = "The car with id ${e.id} was not found"),HttpStatus.NOT_FOUND)

    @ExceptionHandler(LocationNotFoundException::class)
    fun handleLocationNotFound(e : LocationNotFoundException) =
        ResponseEntity(NotFoundError(description = "The location with id ${e.id} was not found."), HttpStatus.NOT_FOUND)
}