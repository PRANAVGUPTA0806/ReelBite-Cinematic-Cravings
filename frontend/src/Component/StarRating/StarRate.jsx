import React, { useState ,useEffect} from 'react';
import './StarRate.css';

const StarRate = ({ userId, productId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [totalStars] = useState(5); // Assuming 5 stars

  const fetchUserRating = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/rating/rating/${userId}/${productId}`);
      const data = await response.json();

      if (data.success) {
        setRating(data.rating); // Set the rating if found
      }
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  };

  // Function to save the rating using fetch
  const saveRating = async (currentRating) => {
    try {
      const response = await fetch('http://localhost:8000/api/rating/save-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          rating: currentRating,
        }),
      });


      const data = await response.json();

      if (data.success) {
        console.log('Rating saved successfully');
      } else {
        console.log('Error saving rating:', data.message);
      }
    } catch (error) {
      console.error('Error occurred while saving rating:', error);
    }
  };

  useEffect(() => {
    fetchUserRating();
  }, []);

  return (
    <>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index} className="starRatelabel">
            <input
              className="starinput"
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => {
                setRating(currentRating);
                saveRating(currentRating); // Save the rating when selected
              }}
            />
            <span
              className="star"
              style={{
                color: currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9',
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
      <p style={{ color: 'white' }}>
        <br />
        "Your Rating": {rating}/5
      </p>
    </>
  );
};

export default StarRate;
