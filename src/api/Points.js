import axios from "axios";
import { env } from "../utils/config";
const apiBaseUrl = `${env.apiBaseUrl}`;

export default {
  getPointsByTraceId(traceId = '', page = 1, limit = 25, otherParams = {}) {
    const params = {
      ...otherParams,
      _page: page,
      _limit: limit,
    }
    if(traceId) params.traceId = traceId
    return axios.get(`${apiBaseUrl}/points`, {
      params
    })
  },
  getAllPointsByTraceId(traceId = 2, otherParams = {}){
    const params = {
      ...otherParams,
      traceId
    }
    return axios.get(`${apiBaseUrl}/points`, {
      params
    })
  }
}