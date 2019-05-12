import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/system/route/routePage',
    method: 'GET',
    params: query
  })
}
export function addObj (obj) {
  return request({
    url: '/system/route/delete',
    method: 'post'
  })
}
export function updateObj (obj) {
  return request({
    url: '/system/route/update',
    method: 'put'
  })
}
export function getObj (id) {
  return request({
    url: '/system/route/route',
    method: 'put'
  })
}
export function delObj (id) {
  return request({
    url: '/system/route/delete',
    method: 'delete'
  })
}
export function refresh () {
  return request({
    url: '/system/route/refresh',
    method: 'GET'
  })
}
export function refreshRemote () {
  return request({
    url: '/system/route/refreshGatewayRoutesCache',
    method: 'GET'
  })
}
