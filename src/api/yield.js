import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/sales/list',
    method: 'post',
    params: params
  })
}

export function deleteYield(id) {
  return request({
    url: '/sales/' + id,
    method: 'delete'
  })
}

export function createYield(data) {
  return request({
    url: '/sales',
    method: 'post',
    data: data
  })
}

export function updateYield(data) {
  return request({
    url: '/sales',
    method: 'put',
    data: data
  })
}

export function getYieldDetail(id) {
  return request({
    url:'/sales/'+id,
    method:'get'
  });
}