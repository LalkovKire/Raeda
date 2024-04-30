package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.UserRequest
import com.sorsix.raeda.api.response.UserResponse
import com.sorsix.raeda.domain.User
import com.sorsix.raeda.domain.enumerations.Role
import com.sorsix.raeda.repository.UserRepository
import com.sorsix.raeda.service.exceptions.UserAlreadyExistsException
import com.sorsix.raeda.service.exceptions.UserNotFoundException
import com.sorsix.raeda.service.exceptions.WrongPhoneNumberFormatException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository, private val encoder: PasswordEncoder){

    fun createUser(user: UserRequest): User? {
        val found = this.userRepository.existsByEmail(user.email)

        return if (!found) {
            if (!checkPhoneNumber(user.phoneNumber))
                throw WrongPhoneNumberFormatException()

            this.userRepository.save(
                User(
                    0L,
                    user.firstName,
                    user.lastName,
                    user.email,
                    formatNumber(user.phoneNumber),
                    encoder.encode(user.userPassword),
                    role = Role.USER
                )
            )
        } else
            throw UserAlreadyExistsException(user.email)
    }

    fun findUserById(id: Long) = userRepository.findByIdOrNull(id) ?: throw UserNotFoundException(id)

    fun deleteUserById(id: Long) = this.userRepository.deleteById(id)

    fun findAllUsers(): List<UserResponse> = this.userRepository.findAll().map {
        UserResponse(it.email)
    }

    private fun checkPhoneNumber(number: String) : Boolean {
        val prefixSet = listOf("070","071","072","073","074","075","076","077","078")
        val prefix = number.substring(0,3)
        val tmp = formatNumber(number)
        if (prefixSet.contains(prefix) && tmp.length == 9) {
                val postfix = tmp.substring(3, 9).toLongOrNull()
                if (postfix != null) return true
        }
        return false
    }

    private fun formatNumber(number: String) =
        number.replace(Regex("[./-]"), "")

}