import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/auth/auth/login',
    method: 'post',
    data
  })
}
export function token () {
  return request({
    url: '/auth/scan/token',
    method: 'post',
  })
}
export function qrcode (data) {
  return request({
    url: '/auth/scan/qrcode',
    method: 'post',
    data
  })
}
export function authInfo (data) {
  return request({
    url: '/auth/scan/info',
    method: 'post',
    data

  })
}
export function userInfo (data) {
  return request({
    url: '/auth/auth/userinfo',
    method: 'post',
    data
  })
}
