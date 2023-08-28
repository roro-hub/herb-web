import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/processing/list',
    method: 'post',
    params: params
  })
}

export function fetchProcessingList(params) {
  return request({
    url: '/processing/list',
    method: 'post',
    params: params
  })
}

export function deleteProcessing(id) {
  return request({
    url: '/processing/' + id,
    method: 'delete'
  })
}

export function createProcessing(data) {
  return request({
    url: '/processing',
    method: 'post',
    data: data
  })
}

export function updateProcessing(data) {
  return request({
    url: '/processing',
    method: 'put',
    data: data
  })
}

export function getProcessingDetail(id) {
  return request({
    url:'/processing/'+id,
    method:'get'
  });
}