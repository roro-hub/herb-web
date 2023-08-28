import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/mapBlock/list',
    method:'post',
    params:params
  })
}

export function createBlock(data) {
  return request({
    url:'/mapBlock',
    method:'post',
    data:data
  })
}

export function updateBlock(data) {
  return request({
    url:'/mapBlock',
    method:'put',
    data:data
  })
}

export function deleteBlock(id) {
  return request({
    url:'/mapBlock/' + id,
    method:'delete',
  })
}