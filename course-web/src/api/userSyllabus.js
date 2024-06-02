import request from '@/utils/request'

export function detail(id) {
  return request({
    url: '/userSyllabus/detail/' + id,
    method: 'get'
  })
}

export function upload(data) {
  return request({
    url: '/userSyllabus/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60 * 1000 * 3,
    data
  })
}

export function page(data) {
  return request({
    url: '/userSyllabus/page',
    method: 'post',
    data
  })
}
