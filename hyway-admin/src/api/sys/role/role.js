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
export function assignRoleermissions (data) {
  return request({
    url: '/system/role/assignRoleermissions',
    method: 'POST',
    data
  })
}
export function fetchRoleResList (data) {
  return request({
    url: '/system/res/selectRoleListTree',
    method: 'POST',
    data
  })
}

