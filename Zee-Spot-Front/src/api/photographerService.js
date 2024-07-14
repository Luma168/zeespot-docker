import { HOST } from "./constants";
import http from "./http";

const photographerService = {
    get_all_photographers(onResponse = undefined) {
        const options = http.defaultOptions();
        return http.call(HOST + `/photographes`, options, onResponse);
    },
}
export default photographerService;