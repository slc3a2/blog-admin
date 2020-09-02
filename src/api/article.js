import request from '@/utils/request'

export function apiCreate(data) {
  return request({
    url: '/create',
    method: 'post',
    data
  })
}
