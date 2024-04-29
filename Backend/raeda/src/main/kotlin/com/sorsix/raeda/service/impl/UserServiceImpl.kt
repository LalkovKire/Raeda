package com.sorsix.raeda.service.impl

import com.sorsix.raeda.api.requests.UserRequest
import com.sorsix.raeda.api.response.UserResponse
import com.sorsix.raeda.domain.User
import com.sorsix.raeda.domain.enumerations.Role
import com.sorsix.raeda.repository.UserRepository
import com.sorsix.raeda.service.UserService
import com.sorsix.raeda.service.exceptions.UserAlreadyExistsException
import com.sorsix.raeda.service.exceptions.UserNotFoundException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(private val userRepository: UserRepository, private val encoder: PasswordEncoder) : UserService {

    override fun createUser(user: UserRequest): User? {
        val found = this.userRepository.existsByEmail(user.email)

        return if (!found) {
            this.userRepository.save(
                User(
                    0L,
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.phoneNumber,
                    encoder.encode(user.userPassword),
                    role = Role.USER
                )
            )
        } else
            throw UserAlreadyExistsException(user.email)
    }

    override fun findUserById(id: Long) = userRepository.findByIdOrNull(id) ?: throw UserNotFoundException(id)

    override fun deleteUserById(id: Long) = this.userRepository.deleteById(id)

    override fun findAllUsers(): List<UserResponse> = this.userRepository.findAll().map {
        UserResponse(it.email)
    }


}