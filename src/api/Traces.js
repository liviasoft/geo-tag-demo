import axios from "axios";
import { env } from "../utils/config";
const apiBaseUrl = `${env.apiBaseUrl}`;

export default {
  getTraces(page = 1, limit = 25) {
    return axios.get(`${apiBaseUrl}/traces?_page=${page}&_per_page=${limit}`)
  }
}