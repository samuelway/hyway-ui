import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/system/user/sysUserPage',
    method: 'GET',
    params: query
  })
}

export function delObj (id) {
  return request({
    url: '/system/user/deleteSysUserById',
    method: 'delete'
  })
}
