import { HOST } from "./constants";
import http from "./http";

const userService = {
    create_user(nom, prenom, email, email_pro = null , tel_primaire, tel_secondaire, siret, siege_social, password, role, onResponse = undefined) {
        const options = http.defaultOptions();
        options.method = "POST";
        options.body = JSON.stringify({
            "nom": nom, 
            "prenom": prenom, 
            "email": email,
            "email_pro": email_pro, 
            "tel_primaire": tel_primaire, 
            "tel_secondaire": tel_secondaire, 
            "siret": siret,
            "siege_social": siege_social,
            "password": password,
            "role": role
        });
        return http.call(HOST + "/register", options, onResponse);
    },
    update_profile(id, name, email, avatar, onResponse = undefined) {
        const options = http.defaultOptions();
        options.method = 'PUT';
        options.body = JSON.stringify({ 'name': name, "email": email, "avatar": avatar });
        return http.call(HOST + "/users/" + id, options, onResponse);
    },
    update_avatar(id, avatar, onResponse = undefined) {
        const options = http.defaultOptions();
        options.method = 'PUT';
        options.body = JSON.stringify({ 'avatar': avatar });
        return http.call(HOST + "/users/" + id, options, onResponse);
    }
}
export default userService;