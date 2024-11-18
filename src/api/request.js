import axios from 'axios';

// 获取Ip信息
export function getIpInfo(ipAddress) {
  return axios({
    url: "https://icutool.cn/api/util/ip?ip=" + ipAddress,
    method: "get",
  });
}