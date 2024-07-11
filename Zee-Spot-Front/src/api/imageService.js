import { HOST } from "./constants";
import http from "./http";

const imageService = {
    create_image(selected, cover, galerieId, file, access_token, onResponse = undefined) {
        const options = http.defaultOptions();
        options.method = "POST";
        options.headers.append('Authorization', 'Bearer ' + access_token);
        options.headers.delete("Content-Type")
        let data = new FormData()
        data.append("selected", selected)
        data.append("cover", cover)
        data.append("galerie", galerieId)
        data.append("images", file)
        options.body = data
        return http.call(HOST + "/images", options, onResponse);
    },

    get_image_name(access_token, url, onResponse = undefined) {
        const options = http.defaultOptions();
        options.headers.append('Authorization', 'Bearer ' + access_token);
        return http.call(HOST + url, options, onResponse);
    },

    delete_image(access_token, id, onResponse = undefined) {
        const options = http.defaultOptions();
        options.method = "DELETE";
        options.headers.append('Authorization', 'Bearer ' + access_token);
        return http.call(HOST + `/images/${id}`, options, onResponse);
    },
}
export default imageService;