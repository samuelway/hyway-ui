import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/auth/auth/login',
    method: 'post',
    data
  })
}
