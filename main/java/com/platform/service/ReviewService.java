package com.platform.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.platform.model.Review;
import com.platform.model.User;
import com.platform.repository.ReviewRepository;
import com.platform.repository.UserRepository;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
    }

    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    public Optional<Review> findById(Long id) {
        return reviewRepository.findById(id);
    }

    public Review createReview(Long reviewerId, Long revieweeId, int rating, String comment) {
        User reviewer = userRepository.findById(reviewerId)
                .orElseThrow(() -> new RuntimeException("Reviewer not found with id: " + reviewerId));
        User reviewee = userRepository.findById(revieweeId)
                .orElseThrow(() -> new RuntimeException("Reviewee not found with id: " + revieweeId));

        Review review = new Review();
        review.setReviewer(reviewer);
        review.setReviewee(reviewee);
        review.setRating(rating);
        review.setComment(comment);

        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
        } else {
            throw new RuntimeException("Review not found with id: " + id);
        }
    }

    public List<Review> findByRevieweeId(Long userId) {
        return reviewRepository.findByRevieweeId(userId);
    }
}
