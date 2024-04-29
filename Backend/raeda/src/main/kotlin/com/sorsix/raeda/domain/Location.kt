package com.sorsix.raeda.domain

import jakarta.persistence.*

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
@Table(name = "location")
data class Location (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "locationid")
    val locId: Long,

    @Column(name = "locationaddress")
    val locationAddress: String,

    @Column(name = "locationname", nullable = false)
    val locationName: String
)