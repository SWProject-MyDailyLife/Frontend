import React from 'react';
import style from './SideBar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const SideBar = () => {
    const userDetail = useSelector((state) => state.userDetail);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Check login status
    const isLoggedIn = sessionStorage.getItem('user_id');

    const handleLogout = () => {
        axios
            .post('/api/logout')
            .then((response) => {
                console.log(response.data.message);
                dispatch({ type: 'USER_LOGOUT' });
                navigate('/users/sign-in');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    const sideBar = [
        { link: '/mydailylife/home', name: '유저 게시물', iclass: 'bi bi-instagram fs-3' },
        { link: '/mydailylife/userlist', name: '사용자 목록', iclass: 'bi bi-people fs-3' },
        { link: '/mydailylife/search', name: '검색', iclass: 'bi bi-compass fs-3' },
        { link: '/mydailylife/message', name: '메세지', iclass: 'bi bi-chat fs-3' },
        { link: '/mydailylife/post', name: '업로드', iclass: 'bi bi-plus-square fs-3' },
    ];

    const handleSideBarClick = (link) => {
        if (isLoggedIn === 'guest' && link !== '/mydailylife/userlist') {
            alert('권한이 필요합니다. 로그인 후 이용해주세요.');
            // Prevent navigation for guests, except for userlist and search
        } else {
            navigate(link);
        }
    };

    return (
        <>
            <Link to="/mydailylife" className={style.logo_container}>
                <div className={style.logo}>MyDailyLife</div>
            </Link>

            <div className={style.side_menu_container}>
                {sideBar.map((side, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleSideBarClick(side.link)}
                        className={style.side_menu}
                        style={{ cursor: isLoggedIn === 'guest' && side.link !== '/mydailylife/userlist' && side.link !== '/mydailylife/search' ? 'not-allowed' : 'pointer' }}
                    >
                        <i className={side.iclass} />
                        <div className={style.side_menu_text}>{side.name}</div>
                    </div>
                ))}
            </div>

            <div className={style.logout_button} onClick={handleLogout}>
                Logout
            </div>
        </>
    );
};

export default SideBar;
