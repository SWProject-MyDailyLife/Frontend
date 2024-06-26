import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeController.css'; // Import the CSS file with styles

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(null);
    const [newKeyword, setNewKeyword] = useState('');
    const [messageContent, setMessageContent] = useState('');

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const isLoggedIn = sessionStorage.getItem('user_id');
                const sessionId = sessionStorage.getItem('session_id');
                console.log('User Logged In:', isLoggedIn);
                console.log('session_id:', sessionId);

                if (isLoggedIn && sessionId) {
                    const response = await axios.get('http://127.0.0.1:5000/api/photos', {
                        params: {
                            user_id: isLoggedIn
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

    const handleEdit = (photo) => {
        setCurrentPhoto(photo);
        setNewKeyword(photo.keywords);
        setIsEditModalOpen(true);
    };

    const handleMessage = (photo) => {
        setCurrentPhoto(photo);
        setIsMessageModalOpen(true);
    };

    const handleSave = async () => {
        try {
            const isLoggedIn = sessionStorage.getItem('user_id');
            
            // 서버에 수정된 키워드 전송
            // await axios.put(`http://127.0.0.1:5000/api/photos/${currentPhoto._id}`, {
            //     keywords: newKeyword
            // }, {
            //     params: {
            //         user_id: isLoggedIn
            //     }
            // });

            // 로컬 상태 업데이트
            setPhotos(photos.map(photo =>
                photo._id === currentPhoto._id ? { ...photo, keywords: newKeyword } : photo
            ));
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error saving keyword:', error);
        }
    };

    const handleSendMessage = async () => {
        try {
            const userId = sessionStorage.getItem('user_id');
            console.log(currentPhoto.user_id)
            const message = {
                user_id: userId,
                to_user_id: currentPhoto.user_id,
                message: messageContent
            };

            const response = await axios.post('http://127.0.0.1:5000/api/messages', message);

            if (response.status === 201) {
                console.log('Message sent successfully');
                setIsMessageModalOpen(false);
                setMessageContent('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleModalClose = () => {
        setIsEditModalOpen(false);
        setIsMessageModalOpen(false);
    };

    return (
        <div className="photo-gallery">
            <h1 style={{ textAlign: 'center', fontSize: '50px', marginRight: '250px' }}>User Photos</h1>
            {photos.map((photo) => (
                <div key={photo._id} className="photo-container">
                    {photo.image && (
                        <img
                            src={`data:image/jpeg;base64,${btoa(photo.image)}`}
                            alt={photo.description}
                            className="photo-img"
                        />
                    )}
                    <p className="keywords">{photo.keywords}</p> {/* 키워드 추가 */}
                    <div className="button-container">
                        {/* 수정 버튼 */}
                        <button className="edit-button" onClick={() => handleEdit(photo)}>수정</button>
                        {/* 메시지 버튼 */}
                        <button className="edit-button" onClick={() => handleMessage(photo)}>메시지</button>
                    </div>
                </div>
            ))}

            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>키워드 수정</h2>
                        <input
                            type="text"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                        />
                        <button onClick={handleSave}>저장</button>
                        <button onClick={handleModalClose}>취소</button>
                    </div>
                </div>
            )}

            {isMessageModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>메시지 보내기</h2>
                        <textarea
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            placeholder="메시지를 입력하세요"
                        />
                        <button onClick={handleSendMessage}>전송</button>
                        <button onClick={handleModalClose}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;
