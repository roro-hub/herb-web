import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/mapBlock/list',
    method:'get',
    params:params
  })
}

export function createMapBlock(data) {
  return request({
    url:'/mapBlock/create',
    method:'post',
    data:data
  })
}

export function updateMapBlock(id, data) {
  return request({
    url:'/mapBlock/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteMapBlock(id) {
  return request({
    url:'/mapBlock/delete/' + id,
    method:'post',
  })
}

export function getMapBlockDetail(id) {
  return request({
    url:'/mapBlock/'+id,
    method:'get'
  });
}