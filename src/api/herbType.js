import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/herbType/list',
    method: 'post',
    params: params
  })
}

export function fetchHerbTypeList(params) {
  return request({
    url: '/herbType/list',
    method: 'post',
    params: params
  })
}

export function deleteHerbType(id) {
  return request({
    url: '/herbType/' + id,
    method: 'delete'
  })
}

export function createHerbType(data) {
  return request({
    url: '/herbType',
    method: 'post',
    data: data
  })
}

export function updateHerbType(data) {
  return request({
    url: '/herbType',
    method: 'put',
    data: data
  })
}

export function getHerbTypeDetail(id) {
  return request({
    url:'/herbType/'+id,
    method:'get'
  });
}
