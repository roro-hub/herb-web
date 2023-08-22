import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/manager/list',
    method:'post',
    params:params
  })
}

export function createManager(data) {
  return request({
    url:'/manager',
    method:'post',
    data:data
  })
}

export function updateManager(id, data) {
  return request({
    url:'/manager' + id,
    method:'put',
    data:data
  })
}

export function deleteManager(id) {
  return request({
    url:'/manager/' + id,
    method:'delete',
  })
}

export function getManagerDetail(id) {
  return request({
    url:'/manager/'+id,
    method:'get'
  });
}