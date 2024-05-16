package com.sorsix.raeda.repository

import com.sorsix.raeda.domain.Rental
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface RentalRepository: JpaRepository<Rental, Long> {

    @Query("SELECT r FROM Rental r WHERE r.dropOffTime <= :currentTime")
    fun findExpiredRentals(currentTime: LocalDateTime): List<Rental>
}