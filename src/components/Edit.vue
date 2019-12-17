<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
            <character-form :character="character" characterBtnTitle="Update Character"
                            @character-is-created-updated="updateCharacter"></character-form>
          </template>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import CharacterService from '@/services/CharacterService'
import CharacterForm from '@/components/CharacterForm'

export default {
  data () {
    return {
      character: {},
      childDataLoaded: false,
      temp: {},
      messagetitle: ' Update Character '
    }
  },
  components: {
    'character-form': CharacterForm
  },
  created () {
    this.getCharacter()
  },
  methods: {
    getCharacter: function () {
      CharacterService.fetchCharacter(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.character = this.temp
          this.childDataLoaded = true
          console.log('Getting Character in Edit: ' + JSON.stringify(this.character, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    updateCharacter: function (character) {
      console.log('Before PUT ' + JSON.stringify(character, null, 5))
      CharacterService.putCharacter(character._id, character)
        .then(response => {
          console.log('AFTER PUT ' + JSON.stringify(character, null, 5))
        })
        .catch(error => {
          // this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
