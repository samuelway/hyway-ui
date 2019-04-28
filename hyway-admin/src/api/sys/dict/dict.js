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
    url: '/system/dict/deleteSysDictById',
    method: 'delete'
  })
}
export function updateObj (obj) {
  return request({
    url: '/system/dict/updateSysDict',
    method: 'put'
  })
}
export function addObj (obj) {
  return request({
    url: '/system/dict/insertSysDict',
    method: 'put'
  })
}
