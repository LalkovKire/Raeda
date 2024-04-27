package com.sorsix.raeda.domain

import com.sorsix.raeda.domain.enumerations.CarStatus
import jakarta.persistence.*

@Entity
@Table(name = "car")
data class Car(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "carid")
    val carID: Long,

    @Column(nullable = false)
    val image: String,

    @Column(name = "gearbox", nullable = false)
    val gearBox: String,

    @Column(nullable = false)
    val model: String,

    @Column(name = "licenseplate", nullable = false, unique = true)
    val licensePlate: String,

    @Column(name = "yearmade", nullable = false)
    val yearMade: Int,

    @Column(nullable = false)
    val seats: Int,

    @Column(nullable = false)
    val status: CarStatus,

    @Column(nullable = false)
    val price: Int,

    @Column(nullable = false)
    val engine: String,

    @Column(name = "cartype", nullable = false)
    val carType: String,

    @Column(name = "doors", nullable = false)
    val doors: Int,

    @Column(name = "fueltype", nullable = false)
    val fuelType: String,

    @Column(name = "brand", nullable = false)
    val brand: String,


    )