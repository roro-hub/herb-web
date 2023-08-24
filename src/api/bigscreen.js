import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/info/list',
    method:'post',
    params:params
  })
}

export function updateInfo(data) {
  return request({
    url:'/info',
    method:'put',
    data:data
  })
}