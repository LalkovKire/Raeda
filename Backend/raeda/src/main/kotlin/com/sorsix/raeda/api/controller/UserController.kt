package com.sorsix.raeda.api.controller

import com.sorsix.raeda.api.requests.UserRequest
import com.sorsix.raeda.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/user")
class UserController(private val userService: UserService) {

    @PostMapping
    fun create(@RequestBody userRequest: UserRequest) =
        ResponseEntity(this.userService.createUser(userRequest),HttpStatus.OK)

    @GetMapping
    fun listAll() =
        ResponseEntity(this.userService.findAllUsers(), HttpStatus.OK)

    @GetMapping("/{id}")
    fun findUserById(@PathVariable id: Long) =
        ResponseEntity(this.userService.findUserById(id),HttpStatus.OK)

    @DeleteMapping("/{id}")
    fun deleteUserById(@PathVariable id: Long) =
        ResponseEntity(this.userService.deleteUserById(id),HttpStatus.OK)

    @GetMapping("/rentals/{id}")
    fun getUserRentalsById(@PathVariable id: Long) =
        this.userService.getUserRentalsById(id)

    @GetMapping("/rentals")
    fun getUserRentalsByEmail(@RequestParam email: String) =
        this.userService.getUserRentalsByEmail(email)
}