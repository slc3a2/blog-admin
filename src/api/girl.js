import request from '@/utils/request'

export function apiCreate(data) {
  return request({
    url: '/girl/create',
    method: 'post',
    data
  })
}
export function apiGetList() {
  return request({
    url: '/girl/list',
    method: 'get'
  })
}
export function apiGetSingle(params) {
  return request({
    url: '/girl/get',
    method: 'get',
    params
  })
}
export function apiUpdate(data) {
  return request({
    url: '/girl/update',
    method: 'put',
    data
  })
}
export function apiDelete(data) {
  return request({
    url: '/girl/delete',
    method: 'delete',
    data
  })
}


