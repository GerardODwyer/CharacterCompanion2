<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <character-form :character="character" characterBtnTitle="Make Character"
                          @character-is-created-updated="submitCharacter"></character-form>
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
      character: {upvotes: 0, level: 0, charactername: ''},
      messagetitle: ' Make Character '
    }
  },
  components: {
    'character-form': CharacterForm
  },
  methods: {
    submitCharacter: function (character) {
      CharacterService.postCharacter(character)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
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
