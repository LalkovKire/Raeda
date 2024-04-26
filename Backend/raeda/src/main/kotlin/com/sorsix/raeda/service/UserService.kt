package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.UserRequest
import com.sorsix.raeda.api.response.UserResponse
import com.sorsix.raeda.domain.User

interface UserService {

    fun createUser(user: UserRequest) : User?

    fun findUserById(id: Long) : User?

    fun deleteUserById(id: Long) : Unit

    fun findAllUsers() : List<UserResponse>
}