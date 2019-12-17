import Api from '@/services/api'

export default {
  fetchWeapons () {
    return Api().get('/weapons')
  },
  postWeapon (weapon) {
    return Api().post('/weapons', weapon,
      { headers: {'Content-type': 'application/json'} })
  },
  /* upvoteWeapon (id) {
    return Api().put(`/weapons/${id}/vote`)
  },   */
  deleteWeapon (id) {
    return Api().delete(`/weapons/${id}`)
  },
  fetchWeapon (id) {
    return Api().get(`/weapons/${id}`)
  },
  putWeapon (id, weapon) {
    console.log('REQUESTING ' + id + ' ' +
      JSON.stringify(weapon, null, 5))
    return Api().put(`/weapons/${id}`, weapon,
      { headers: {'Content-type': 'application/json'} })
  }
}
