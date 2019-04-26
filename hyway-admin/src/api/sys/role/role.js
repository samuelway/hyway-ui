import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/system/role/rolePage',
    method: 'GET',
    params: query
  })
}

export function delObj (id) {
  return request({
    url: '/system/role/deleteSysRoleById',
    method: 'delete'
  })
}
