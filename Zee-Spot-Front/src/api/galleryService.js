import { HOST } from "./constants";
import http from "./http";

const galleryService = {
    create_gallery(user, titre, date, disposition, isPublic, access_token, onResponse = undefined) {
        const options = http.defaultOptions();
        options.method = "POST";
        options.headers.append('Authorization', 'Bearer ' + access_token);
        options.body = JSON.stringify({
            "user": user, 
            "titre": titre, 
            "date": date, 
            "disposition": disposition, 
            "public": isPublic == "on" ? true : false ,
        });
        return http.call(HOST + "/galeries", options, onResponse);
    },
    
    get_galleries_by_user(access_token, onResponse = undefined) {
        const options = http.defaultOptions();
        options.headers.append('Authorization', 'Bearer ' + access_token);
        return http.call(HOST + `/getgaleriebyuser`, options, onResponse);
    },

    get_gallery_by_uid(access_token, uid, onResponse = undefined) {
        const options = http.defaultOptions();
        options.headers.append('Authorization', 'Bearer ' + access_token);
        return http.call(HOST + `/galeries/${uid}`, options, onResponse);
    },

    delete_gallery_by_uid(access_token, uid, onResponse = undefined) {
        const options = http.defaultOptions();
        options.method = "DELETE";
        options.headers.append('Authorization', 'Bearer ' + access_token);
        return http.call(HOST + `/galeries/${uid}`, options, onResponse);
    },
}
export default galleryService;