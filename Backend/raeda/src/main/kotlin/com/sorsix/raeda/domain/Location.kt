package com.sorsix.raeda.domain

import jakarta.persistence.*

@Entity
@Table(name = "location")
data class Location(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "locationid")
    val locId: Long,

    @Column(name = "locationaddress")
    val locationAddress: String,

    @Column(name = "locationname")
    val locationName: String
)