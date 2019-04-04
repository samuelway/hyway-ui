import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/system/user/login',
    method: 'post',
    data
  })
}
