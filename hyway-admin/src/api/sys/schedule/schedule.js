import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/system/scheduleJob/json',
    method: 'GET',
    params: query
  })
}

export function delObj (id) {
  return request({
    url: '/system/scheduleJob/delete',
    method: 'delete'
  })
}
