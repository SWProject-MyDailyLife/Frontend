import React, { useState } from 'react';
import style from './Sign.module.css';
import { useNavigate } from "react-router-dom";
import authAxios from "../../components/axios/authAxios";

const SignIn = () => {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const signin = [
        { name: 'email', type: 'text', placeholder: '아이디' },
        { name: 'password', type: 'password', placeholder: '비밀번호' }
    ];

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const onSubmit = () => {
        const loginData = { user_id: inputs.email, password: inputs.password };
        console.log('Submitting login data:', loginData);

        authAxios.post("/login", loginData)
            .then((res) => {
                console.log('Login Response:', res.data);
                sessionStorage.setItem('user_id', res.data.user_id);
                sessionStorage.setItem('session_id', res.data.session_id);
                alert("로그인에 성공하였습니다!");
                navigate("/mydailylife");
            })
            .catch((err) => {
                console.log('Login Error:', err.response?.data?.message || err.message);
                alert(err.response?.data?.message || '로그인에 실패하였습니다.');
            });
    };

    const guestLogin = () => {
        sessionStorage.setItem('user_id', "guest");
        alert("비회원으로 로그인하였습니다.");
        navigate("/mydailylife"); // Adjust the path as needed for your guest user flow
    };

    return (
        <>
            <div className={style.sign_input_container}>
                <div className={style.logo}>MyDailyLife</div>
                {signin.map((component, idx) => (
                    <input
                        key={idx}
                        className={style.inputs}
                        name={component.name}
                        type={component.type}
                        placeholder={component.placeholder}
                        onChange={onChange}
                    />
                ))}
                <button className={style.buttons} onClick={onSubmit}>로그인</button>
            </div>
            <div className={style.sign_nav_container}>
                <div>
                    계정이 없으신가요? <span className={style.nav_link} onClick={() => navigate('/users/sign-up')}>가입하기</span>
                </div>
                <div>
                    비회원 로그인 <span className={style.nav_link} onClick={guestLogin}>비회원 로그인</span>
                </div>
            </div>
        </>
    );
};

export default SignIn;