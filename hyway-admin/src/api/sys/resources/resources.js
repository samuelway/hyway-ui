import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/system/res/resourcesPage',
    method: 'GET',
    params: query
  })
}
export function delObj (id) {
  return request({
    url: '/system/res/deleteSysResourcesById',
    method: 'delete',
    params: id
  })
}
