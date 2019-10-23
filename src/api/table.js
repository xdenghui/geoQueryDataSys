import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/dev-api/table/list',
    method: 'get',
    params
  })
}
