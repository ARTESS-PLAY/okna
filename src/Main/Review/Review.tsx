import React from 'react';
import { ReviewInterface } from '../../interfaces/ReviewInterface';
import Star from '../../img/star.svg';
import './Review.scss';

function Review(props: { key: string; review: ReviewInterface }) {
    return (
        <div className="review col-12">
            <div className="review-data col-md-12">
                <h3 className="headline">{props.review.name}</h3>
                <div className="review-data-stars">
                    {[...Array(props.review.stars)].map((_, i) => (
                        <img src={Star} key={i} alt="icon of star" />
                    ))}
                </div>
                <p className="review-data-date">{props.review.date}</p>
                <p className="review-data-source">
                    Отзыв из сервиса <br /> {props.review.source}
                </p>
            </div>
            <p className="review-text col-md-12">{props.review.review}</p>
        </div>
    );
}

export default Review;
