package com.sorsix.raeda.repository

import com.sorsix.raeda.api.requests.CarRequest
import com.sorsix.raeda.domain.Car
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.domain.Specification
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.lang.Nullable
import org.springframework.stereotype.Repository

@Repository
interface CarRepository : JpaRepository<Car, Long> {

    override fun findAll(page: Pageable): Page<Car>

    @Query("SELECT * FROM car WHERE status = 0 ORDER BY carid DESC LIMIT 6", nativeQuery = true)
    fun getLatestInventory(): List<Car>

    fun existsByLicensePlate(licensePlate: String): Boolean

    fun getCarByLicensePlate(licensePlate: String): Car

    @Query(
        value = "SELECT c.* FROM car c" +
                " INNER JOIN location l" +
                " ON l.locationid = c.locationid" +
                " WHERE (:location IS NULL OR l.locationname = :location)" +
                " AND (:price IS NULL OR c.price <= :price)" +
                " AND (:brand IS NULL OR c.brand IN (:brand))" +
                " AND (:year IS NULL OR c.yearmade IN (:year))" +
                " AND (:fuel IS NULL OR c.fueltype = :fuel)" +
                " AND (:gear IS NULL OR c.gearbox = :gear)" +
                " AND (:availableOnly IS NULL OR c.status = :availableOnly)",
        nativeQuery = true
    )
    fun getCarByFiltering(
        @Param("location") location: String?,
        @Param("price") price: Int?,
        @Param("brand") brand: List<String>?,
        @Param("year") year: List<Int>,
        @Param("fuel") fuel: String?,
        @Param("gear") gear: String?,
        @Param("availableOnly") availableOnly: Int?,
        pageable: Pageable
    ): Page<Car>
}