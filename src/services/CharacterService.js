import Api from '@/services/api'

export default {
  fetchCharacters () {
    return Api().get('/characters')
  },
  postCharacter (character) {
    return Api().post('/characters', character,
      { headers: {'Content-type': 'application/json'} })
  },
  upvoteCharacter (id) {
    return Api().put(`/characters/${id}/vote`)
  },
  deleteCharacter (id) {
    return Api().delete(`/characters/${id}`)
  },
  fetchCharacter (id) {
    return Api().get(`/characters/${id}`)
  },
  putCharacter (id, character) {
    console.log('REQUESTING ' + id + ' ' +
      JSON.stringify(character, null, 5))
    return Api().put(`/characters/${id}`, character,
      { headers: {'Content-type': 'application/json'} })
  }
}
