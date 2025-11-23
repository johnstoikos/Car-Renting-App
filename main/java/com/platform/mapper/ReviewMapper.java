package com.platform.mapper;

import com.platform.dto.ReviewDTO;
import com.platform.model.Review;

public class ReviewMapper {

    public static ReviewDTO toDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setReviewerId(review.getReviewer().getId());
        dto.setRevieweeId(review.getReviewee().getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        return dto;
    }

}
