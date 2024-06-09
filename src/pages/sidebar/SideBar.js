import React from 'react';
import style from './SideBar.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import {Static_Base_Url} from "../../index";
import axios from 'axios'; // axios 라이브러리 import

const SideBar = () => {

    const userDetail = useSelector(state => state.userDetail);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post('/api/logout') // 로그아웃 API 호출
            .then(response => {
                console.log(response.data.message);
                dispatch({ type: 'USER_LOGOUT' }); // 로그아웃 액션 디스패치
                navigate("/users/sign-in");
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    const sideBar = [
        {link: '/mydailylife/home', name: '유저 게시물', iclass: 'bi bi-instagram fs-3'},
        {link: '/mydailylife/userlist', name: '사용자 목록', iclass: 'bi bi-people fs-3'},
        {link: '/mydailylife/search', name: '탐색', iclass: 'bi bi-compass fs-3'},
        {link: '/mydailylife/message', name: '메세지', iclass: 'bi bi-chat fs-3'},
        {link: '/mydailylife/post', name: '업로드', iclass: 'bi bi-plus-square fs-3'},
    ]

    // const logout = () => {
    //     window.localStorage.clear();
    //     navigate("/users/sign-in")
    // }

    return (
        <>
            <Link to='/mydailylife' className={style.logo_container}>
                <div className={style.logo}>
                    MyDailyLife
                </div>
            </Link>


            <div className={style.side_menu_container}>
                {sideBar.map((side, idx) => {
                    if(idx === sideBar.length-1) {
                        return (
                            <Link key={idx} to={side.link} className={style.side_menu}>
                                <img className={style.profile_img} src={Static_Base_Url + userDetail.profileUrl}/>
                                <div className={style.side_menu_text}>{side.name}</div>
                            </Link>
                        );
                    }
                    else {
                        return (
                            <Link key={idx} to={side.link} className={style.side_menu}>
                                <i className={side.iclass}/>
                                <div className={style.side_menu_text}>{side.name}</div>
                            </Link>
                        );
                    }
                })}
            </div>

            <div className={style.logout_button} onClick={handleLogout}>Logout</div> {/* 로그아웃 버튼에 onClick 이벤트 추가 */}

        </>
    );
};

export default SideBar;