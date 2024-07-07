import http from './http';
import { HOST } from './constants';

const authService = {
    authenticate(email, password, onResponse = undefined) {
        const options = http.defaultOptions();
        options.method = "POST";
        options.body = JSON.stringify({ "email": email, "password": password });
        return http.call(HOST + "/login_check", options, onResponse);
    },
    refresh_token(refreshToken, onResponse = undefined) {
        const options = http.defaultOptions();
        options.method = "POST";
        options.body = JSON.stringify({ "refreshToken": refreshToken });
        return http.call(HOST + "/auth/refresh-token", options, onResponse);
    },
    profile(access_token, onResponse = undefined) {
        const options = http.defaultOptions();
        options.headers.append('Authorization', 'Bearer ' + access_token);
        return http.call(HOST + "/me", options, onResponse);
    },
}
export default authService;