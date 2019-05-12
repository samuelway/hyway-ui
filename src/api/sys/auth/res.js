import request from '@/plugin/axios'

export function GetMenu () {
  return request({
    url: '/system/user/getUserResources',
    method: 'GET'
  })
}
