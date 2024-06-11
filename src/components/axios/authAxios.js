// import axios from "axios";
// // import MockAdapter from "axios-mock-adapter"; // Mocking 사용

// const headers = {
//     'Access-Control-Allow-Origin': '*',
// }

// axios.defaults.withCredentials = true; 

// const authAxios = axios.create({
//     baseURL: 'http://127.0.0.1:5000/api',
//     withCredentials: true
// });

// // authAxios.interceptors.request.use(config => {
// //     const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('session='));
// //     if (sessionCookie) {
// //         config.headers['Cookie'] = sessionCookie.split('=')[1];
// //     }
// //     return config;
// // });

// authAxios.interceptors.response.use
//     .then(response => {
    
//         console.log(response.headers);
        
//         setSession(response.data.success)
//         setCheckedSession(true)
        
//     })
//     .catch(err => {
    
//         setSession(false)
//         setCheckedSession(true)
    
//         if(err.response) {
    
//         }
//         else {
    
//             window.alert('Could not establish a connection to the server!');
//         }
//     });

// authAxios.interceptors.response.use(
//     response => response,
//     error => Promise.reject(error)
// );

// // // Mocking setup
// // if (process.env.NODE_ENV === 'development') {
// //     const mock = new MockAdapter(authAxios);

// //     // 회원가입 요청에 대한 Mock 응답 설정
// //     mock.onPost("/join").reply(200, "회원가입이 완료되었습니다.");

// //     mock.onPost("/login").reply((config) => {
// //         const data = JSON.parse(config.data);
// //         if (data.email === 'test@test.com' && data.password === '0000') {
// //             return [200, { accessToken: 'fake-jwt-token' }];
// //         } else {
// //             return [400, { message: '로그인에 실패하였습니다.' }];
// //         }
// //     });
// // }

// export default authAxios;
import axios from "axios";

// axios 기본 설정
// axios.defaults.withCredentials = true;

const authAxios = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    // withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
});

authAxios.interceptors.request.use(config => {
    console.log('Request:', config);
    return config;
}, error => {
    console.log('Request Error:', error);
    return Promise.reject(error);
});

authAxios.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        console.log('Response Error:', error);
        return Promise.reject(error);
    }
);

export default authAxios;