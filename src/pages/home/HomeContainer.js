import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
      const fetchPhotos = async () => {
          try {
              const isLoggedIn = sessionStorage.getItem('user_id');
              const sessionId = sessionStorage.getItem('session_id');
              console.log('User Logged In:', isLoggedIn);

              if (isLoggedIn && sessionId) {
                const response = await axios.get('http://127.0.0.1:5000/api/photos', {
                  headers: {
                    'user_id': isLoggedIn,
                    'session_id': sessionId
                  },
                  withCredentials: true
                });
                setPhotos(response.data);
              } else {
                console.log('User is not logged in.');
              }
            } catch (error) {
              console.error('Error fetching photos:', error);
            }
      };

        fetchPhotos();
    }, []);

    return (
        <div>
            <h1>User Photos</h1>
            {photos.map((photo) => (
                <div key={photo._id}>
                    <img src={photo.photo_url} alt={photo.description} />
                    <p>{photo.description}</p>
                    <p>{(photo.keywords || []).join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default PhotoGallery;