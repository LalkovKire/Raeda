package com.sorsix.raeda.service

import com.sorsix.raeda.api.requests.ReviewRequest
import com.sorsix.raeda.api.response.CarReviewSummary
import com.sorsix.raeda.api.response.ReviewResponse
import com.sorsix.raeda.api.util.toReviewResponse
import com.sorsix.raeda.domain.Review
import com.sorsix.raeda.repository.ReviewRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class ReviewService(
    private val reviewRepository: ReviewRepository,
    private val rentalService: RentalService,
    private val userService: UserService,
    ) {

    fun createReviewForRentedCar(review: ReviewRequest) : ReviewResponse {
        val user = this.userService.findUserByEmail(review.userEmail)

        val rental = this.rentalService.getRentalById(review.rentalID)

        return this.reviewRepository.save(Review(
            0L,
            LocalDateTime.now(),
            review.rating,
            review.description,
            user,
            rental
        )).toReviewResponse()
    }

    fun getTotalReviewsForCar(id: Long): CarReviewSummary {
        val reviews = this.reviewRepository.findByCarId(id)

        val totalRating = calcTotalRating(reviews)

        val reviewResponses = reviews.map { it.toReviewResponse() }

        return CarReviewSummary(
            totalRating = totalRating,
            reviews = reviewResponses
        )
    }

    fun calcTotalRating(reviews: List<Review>) : Double {
        return if (reviews.isEmpty())
            0.0
        else
            reviews.sumOf { it.rating.toDouble() } / reviews.size
    }
}