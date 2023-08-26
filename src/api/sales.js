import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/sales/list',
    method: 'post',
    params: params
  })
}

export function deleteSales(id) {
  return request({
    url: '/sales/' + id,
    method: 'delete'
  })
}

export function createSales(data) {
  return request({
    url: '/sales',
    method: 'post',
    data: data
  })
}

export function updateSales(data) {
  return request({
    url: '/sales',
    method: 'put',
    data: data
  })
}

export function getSalesDetail(id) {
  return request({
    url:'/sales/'+id,
    method:'get'
  });
}