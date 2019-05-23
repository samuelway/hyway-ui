import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/schedule/json',
    method: 'GET',
    params: query
  })
}

export function fetchRunningList (query) {
  return request({
    url: '/schedule/running/json',
    method: 'GET',
    params: query
  })
}

export function delObj (id) {
  return request({
    url: '/schedule/delete',
    method: 'delete'
  })
}
