// src/PhotoGallery.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // 사용자가 로그인한 상태인지 확인
        const isLoggedIn = sessionStorage.getItem('user_id'); // 예를 들어 sessionStorage에 user_id가 저장되어 있는지 확인
        console.log(isLoggedIn)

        if (isLoggedIn) {
          // 사용자가 로그인한 경우에만 요청을 보냄
          const response = await axios.get('http://127.0.0.1:5000/api/photos', {
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
          <p>{photo.keywords.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
