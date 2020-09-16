import request from '@/utils/request'

export function apiCreate(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}
export function apiGetList() {
  return request({
    url: '/article/findAll',
    method: 'get'
  })
}
export function apiGetSingle(params) {
  return request({
    url: '/article/findOneById',
    method: 'get',
    params
  })
}
export function apiUpdate(data) {
  return request({
    url: '/article/update',
    method: 'put',
    data
  })
}
export function apiDelete(data) {
  return request({
    url: '/article/delete',
    method: 'delete',
    data
  })
}


