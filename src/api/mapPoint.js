import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/mapBlock/list',
    method:'post',
    params:params
  })
}

export function createMapPoint(data) {
  return request({
    url:'/mapBlock',
    method:'post',
    data:data
  })
}

export function updateMapPoint(data) {
  return request({
    url:'/mapBlock',
    method:'put',
    data:data
  })
}

export function deleteMapPoint(id) {
  return request({
    url:'/mapBlock/' + id,
    method:'delete',
  })
}

export function getMapPointDetail(id) {
  return request({
    url:'/mapBlock/'+id,
    method:'get'
  });
}