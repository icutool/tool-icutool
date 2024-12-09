import axios from 'axios';
import {baseURL} from "@/utils/index";
axios.defaults.baseURL = baseURL
// 获取Ip信息
export function getIpInfo(data) {
  return axios({
    url: "/util/ip",
    method: "get",
    params: data,
  });
}
export function getMyIpInfo(data) {
  return axios({
    url: "/util/myIP",
    method: "get",
    params: data,
  });
}
export function feedback(data) {
  return axios({
    url: "/feedback/add",
    method: "post",
    data,
  });
}