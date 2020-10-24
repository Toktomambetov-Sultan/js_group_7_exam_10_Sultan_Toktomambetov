import axios from "axios";
import { BaseUrl } from "./config";

const axiosOrder = axios.create({
    baseURL: BaseUrl,
});

export default axiosOrder;