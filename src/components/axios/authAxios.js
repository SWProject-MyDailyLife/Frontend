import axios from "axios";
// import MockAdapter from "axios-mock-adapter"; // Mocking 사용

const headers = {
    'Access-Control-Allow-Origin': '*',
}

const authAxios = axios.create({
    baseURL: '/api/users',
    headers: headers
});

authAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// // Mocking setup
// if (process.env.NODE_ENV === 'development') {
//     const mock = new MockAdapter(authAxios);

//     // 회원가입 요청에 대한 Mock 응답 설정
//     mock.onPost("/join").reply(200, "회원가입이 완료되었습니다.");

//     mock.onPost("/login").reply((config) => {
//         const data = JSON.parse(config.data);
//         if (data.email === 'test@test.com' && data.password === '0000') {
//             return [200, { accessToken: 'fake-jwt-token' }];
//         } else {
//             return [400, { message: '로그인에 실패하였습니다.' }];
//         }
//     });
// }

export default authAxios;