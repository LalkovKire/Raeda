package com.sorsix.raeda.repository

import com.sorsix.raeda.domain.Car
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface CarRepository : JpaRepository<Car,Long> {

    @Query("select * FROM car order by carid DESC LIMIT 1", nativeQuery = true)
    fun getLatestInventory() : List<Car>

}