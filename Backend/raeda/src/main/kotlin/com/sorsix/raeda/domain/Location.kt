package com.sorsix.raeda.domain

<<<<<<< HEAD
import jakarta.persistence.*

@Entity
@Table(name = "location")
data class Location(
=======
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
data class Location (
>>>>>>> 8afdc0a810fdfb183bc4c5ed24b6367a7e698640

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "locationid")
<<<<<<< HEAD
    val locId: Long,

    @Column(name = "locationaddress")
    val locationAddress: String,

    @Column(name = "locationname")
=======
    val locID: Long,

    @Column(name = "locationsite", nullable = false)
    val locationSite: String,

    @Column(name = "locationname", nullable = false)
>>>>>>> 8afdc0a810fdfb183bc4c5ed24b6367a7e698640
    val locationName: String
)