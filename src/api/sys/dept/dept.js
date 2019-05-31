import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/system/dept/deptPage',
    method: 'GET',
    params: query
  })
}
export function delObj (id) {
  return request({
    url: '/system/dept/deleteSysDeptById',
    method: 'delete',
    params: id
  })
}
export function addObj (data) {
  return request({
    url: '/system/dept/insertSysDept',
    method: 'post',
    data
  })
}
export function fetchTreeList (query) {
  return request({
    url: '/system/dept/selectListTree',
    method: 'GET',
    params: query
  })
}
