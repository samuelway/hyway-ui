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
export function getObj (id) {
  return request({
    url: '/system/user/sysUser',
    method: 'get',
    params: {id:id}
  })
}
export function addObj (data) {
  return request({
    url: '/system/user/insertSysUser',
    method: 'post',
    data: data
  })
}
export function updateObj (data) {
  return request({
    url: '/system/user/updateSysUser',
    method: 'post',
    data: data
  })
}
