import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/system/dict/dictPage',
    method: 'GET',
    params: query
  })
}

export function delObj (id) {
  return request({
    url: '/system/dict/delete',
    method: 'delete'
  })
}
export function updateObj (id) {
  return request({
    url: '/system/dict/delete',
    method: 'put'
  })
}
export function addObj (id) {
  return request({
    url: '/system/dict/insert',
    method: 'put'
  })
}
