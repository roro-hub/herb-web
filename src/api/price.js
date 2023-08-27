import request from '@/utils/request'

export function getPriceTodayList(params) {
  return request({
    url:'/price/todayList',
    method:'post',
    params:params
  })
}

export function getPriceLatestList(params) {
  return request({
    url:'/price/latestList',
    method:'post',
    params:params
  })
}

export function getPriceRankingToday(params) {
  return request({
    url:'/priceRanking/today',
    method:'post',
    params:params
  })
}

export function getPriceHistory(params) {
  return request({
    url:'/price/history',
    method:'post',
    params:params
  })
}

export function getPriceLatestSite(params) {
  return request({
    url:'/price/latestSite',
    method:'post',
    params:params
  })
}

export function getPriceSite(params) {
  return request({
    url:'/price/site',
    method:'post',
    params:params
  })
}

export function getPriceRecently(params) {
  return request({
    url:'/price/recently',
    method:'post',
    params:params
  })
}


