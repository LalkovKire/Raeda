package com.sorsix.raeda.domain

import com.sorsix.raeda.domain.enumerations.Role
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "caruser")
data class User(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    val userId: Long,

    @Column(name = "firstname", nullable = false)
    val firstName: String,

    @Column(name = "lastname", nullable = false)
    val lastName: String,

    @Column(nullable = false)
    val email: String,

    @Column(name = "phonenumber", nullable = false)
    val phoneNumber: String,

    @Column(name="userpassword",nullable = false)
    val userPassword: String,

    @Column(name = "userrole", nullable = false)
    val role: Role
)