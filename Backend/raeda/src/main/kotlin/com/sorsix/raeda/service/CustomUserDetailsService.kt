package com.sorsix.raeda.service

import com.sorsix.raeda.repository.UserRepository
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

typealias ApplicationUser = com.sorsix.raeda.domain.User

@Service
class CustomUserDetailsService(private val userRepository: UserRepository) : UserDetailsService {


    override fun loadUserByUsername(username: String): UserDetails {
        val found = userRepository.findByEmail(username)

        return found?.mapToUserDetails() ?: throw UsernameNotFoundException("Not Found")
    }

    private fun ApplicationUser.mapToUserDetails(): UserDetails =
        User.builder()
            .username(this.email)
            .password(this.userPassword)
            .roles(this.role.name)
            .build()
}