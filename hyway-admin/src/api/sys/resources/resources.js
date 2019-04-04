import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/res/resourcesPage',
    method: 'GET',
    params: query
  })
}
export function delObj (id) {
  return request({
    url: '/res/deleteSysResourcesById',
    method: 'delete',
    params: id
  })
}
