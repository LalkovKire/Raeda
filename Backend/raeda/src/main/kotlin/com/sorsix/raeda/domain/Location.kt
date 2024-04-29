package com.sorsix.raeda.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
data class Location (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "locationid")
    val locID: Long,

    @Column(name = "locationsite", nullable = false)
    val locationSite: String,

    @Column(name = "locationname", nullable = false)
    val locationName: String
)