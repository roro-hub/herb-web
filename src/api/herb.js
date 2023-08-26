import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/herb/list',
    method: 'post',
    params: params
  })
}

export function fetchHerbList(params) {
  return request({
    url: '/herb/list',
    method: 'post',
    params: params
  })
}

export function deleteHerb(id) {
  return request({
    url: '/herb/' + id,
    method: 'delete'
  })
}

export function createHerb(data) {
  return request({
    url: '/herb',
    method: 'post',
    data: data
  })
}

export function updateHerb(data) {
  return request({
    url: '/herb',
    method: 'put',
    data: data
  })
}

export function getHerbDetail(id) {
  return request({
    url:'/herb/'+id,
    method:'get'
  });
}