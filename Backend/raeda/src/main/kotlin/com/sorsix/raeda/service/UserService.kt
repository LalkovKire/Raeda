package com.sorsix.raeda.service

import com.sorsix.raeda.domain.User

interface UserService {

    fun createUser(user: UserDto) : User?

    fun findUserById(id: Long) : User?

    fun deleteUserById(id: Long) : Unit

    fun findAllUsers() : List<User>
}