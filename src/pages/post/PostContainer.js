import React, { useState } from 'react';
import style from './Post.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostContainer = () => {
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem('user_id');

    const [files, setFiles] = useState([]);
    const [keywords, setKeywords] = useState([]);

    const onChangeFiles = (e) => {
        const fileList = Array.from(e.target.files);
        setFiles(fileList);
    };

    const onChangeKeywords = (e) => {
        const inputKeywords = e.target.value.split(',').map(keyword => keyword.trim());
        setKeywords(inputKeywords);
    };

    const onSubmit = () => {
        if (files.length === 0) {
            alert('사진을 선택하세요');
            return;
        }
    
        const file = files[0]; // 파일이 1개일 때는 첫 번째 파일을 사용
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const imageData = reader.result;
    
            // 이미지 데이터를 서버로 전송
            axios.post('http://127.0.0.1:5000/api/photos', {
                user_id: isLoggedIn,
                image: imageData, // Base64로 인코딩된 이미지 데이터를 서버로 보냄
                keywords: keywords // 키워드를 배열로 전송
            }, {
                withCredentials: true
            }).then((response) => {
                alert(response.data.message);
                navigate('/mydailylife/home');
            }).catch((error) => {
                console.error('Error:', error);
            });
        };
    };

    return (
        <div className={style.post_container}>
            <div className={style.post_header_container}>
                <div />
                <div>새 게시물 만들기</div>
                <div className={style.submit} onClick={onSubmit}>
                    공유하기
                </div>
            </div>
            <div className={style.post_body_container}>
                <div className={style.input_container}>
                    <input 
                        className={style.input_item} 
                        type="file" 
                        multiple 
                        onChange={onChangeFiles} 
                    />
                    <div className={style.vertical_line}></div>
                    <input 
                        className={style.input_item}
                        type="text"
                        placeholder="키워드 입력 (쉼표로 구분)"
                        onChange={onChangeKeywords}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostContainer;
