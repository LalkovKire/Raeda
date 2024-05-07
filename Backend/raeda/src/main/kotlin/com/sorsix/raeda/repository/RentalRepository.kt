package com.sorsix.raeda.repository

import com.sorsix.raeda.domain.Rental
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RentalRepository: JpaRepository<Rental, Long> {
}