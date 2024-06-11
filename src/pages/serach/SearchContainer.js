import React, { useState } from 'react';
import axios from 'axios';
import styles from './Search.module.css'; // Import CSS module

const SearchContainer = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/photos/search', {
                params: {
                    keyword: keyword
                }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error searching photos:', error);
        }
    };

    return (
        <div className={styles.container}> 
            <h3 style={{fontWeight: 'bold', textAlign: 'center'}}>사진 검색</h3>
            <div className={styles.header}>
                <input
                    className={styles.input} 
                    type="text"
                    placeholder="keyword를 입력하세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className={styles.button} onClick={handleSearch}>Search</button>
            </div>
            <div className={styles.results}>
                {results.map((photo) => (
                    <div key={photo._id} className={styles.photoContainer}>
                        <img src={photo.photo_url} alt="Photo" className={styles.photo} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchContainer;
