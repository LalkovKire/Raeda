package com.sorsix.raeda.repository

import com.sorsix.raeda.domain.Car
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CarRepository : JpaRepository<Car,Long> {
}