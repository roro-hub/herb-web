import request from '@/utils/request'

export function fetchList(parentId, params) {
  return request({
    url: '/herb/list/' + parentId,
    method: 'get',
    params: params
  })
}

export function deleteherb(id) {
  return request({
    url: '/herb/delete/' + id,
    method: 'post'
  })
}

export function createherb(data) {
  return request({
    url: '/herb/create',
    method: 'post',
    data: data
  })
}

export function updateherb(id, data) {
  return request({
    url: '/herb/update/' + id,
    method: 'post',
    data: data
  })
}

export function getherb(id) {
  return request({
    url: '/herb/' + id,
    method: 'get',
  })
}

export function updateHidden(id, params) {
  return request({
    url: '/herb/updateHidden/' + id,
    method: 'post',
    params: params
  })
}

export function fetchTreeList() {
  return request({
    url: '/herb/treeList',
    method: 'get'
  })
}

