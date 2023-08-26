import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/processing/list',
    method: 'post',
    params: params
  })
}

export function deleteDiet(id) {
  return request({
    url: '/processing/' + id,
    method: 'delete'
  })
}

export function createDiet(data) {
  return request({
    url: '/processing',
    method: 'post',
    data: data
  })
}

export function updateDiet(data) {
  return request({
    url: '/processing',
    method: 'put',
    data: data
  })
}

export function getDietDetail(id) {
  return request({
    url:'/processing/'+id,
    method:'get'
  });
}