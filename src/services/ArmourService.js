import Api from '@/services/api'

export default {
  fetchArmours () {
    return Api().get('/armours')
  },
  postArmour (armour) {
    return Api().post('/armours', armour,
      { headers: {'Content-type': 'application/json'} })
  },
  upvoteArmour (id) {
    return Api().put(`/armours/${id}/vote`)
  },
  deleteArmour (id) {
    return Api().delete(`/armours/${id}`)
  },
  fetchArmour (id) {
    return Api().get(`/armours/${id}`)
  },
  putArmour (id, armour) {
    console.log('REQUESTING ' + id + ' ' +
      JSON.stringify(armour, null, 5))
    return Api().put(`/armours/${id}`, armour,
      { headers: {'Content-type': 'application/json'} })
  }
}
