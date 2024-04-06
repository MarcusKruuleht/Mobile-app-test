import axios from "axios";
import Config from "react-native-config"

export const request = ({url, method, data}) => {
    axios({
        method: method || 'get',
        url: `${Config.API_BASE_URL}/${url}`,
        data
    })
}