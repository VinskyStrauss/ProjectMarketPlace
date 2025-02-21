import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export const renderStars = (rating: string): React.ReactNode => {
  const ratingFloat = Math.round(parseFloat(rating)); // Convert string to number and round it
  const roundedRating = Math.floor(ratingFloat); // Round down to the nearest integer
  const hasHalfStar = ratingFloat % 1 === 0.5; // Check if there's a half-star

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;

    if (starValue <= roundedRating) {
      return <BsStarFill key={index} />;
    } else if (hasHalfStar && starValue === roundedRating + 1) {
      return <BsStarHalf key={index} />;
    } else {
      return <BsStar key={index} />;
    }
  });

  return <div className="flex text-yellow-400">{stars}</div>;
};
