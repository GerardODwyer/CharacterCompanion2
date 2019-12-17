<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{characternametitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="characters" :options="options">
        <a slot="upvote" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="upvote(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editCharacter(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteCharacter(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import CharacterService from '@/services/CharacterService'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Characters',
  data () {
    return {
      characternametitle: ' Characters List ',
      characters: [],
      props: ['_id'],
      errors: [],
      columns: ['_id', 'charactername', 'level', 'upvotes', 'upvote', 'edit', 'remove'],
      options: {
        perPage: 10,
        filterable: ['charactername', 'level', 'upvotes'],
        sortable: ['upvotes'],
        headings: {
          _id: 'ID',
          charactername: 'Character Name',
          level: 'level',
          upvotes: 'Upvotes'
        }
      }
    }
  },
  // Fetches Characters when the component is created.
  created () {
    this.loadCharacters()
  },
  methods: {
    loadCharacters: function () {
      CharacterService.fetchCharacters()
        .then(response => {
          // JSON responses are automatically parsed.
          this.characters = response.data
          console.log(this.characters)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    upvote: function (id) {
      CharacterService.upvoteCharacter(id)
        .then(response => {
          // JSON responses are automatically parsed.
          this.loadCharacters()
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    editCharacter: function (id) {
      this.$router.params = id
      this.$router.push('edit')
    },
    deleteCharacter: function (id) {
      this.$swal({
        title: 'Are you totally sure?',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result.value)
        if (result.value === true) {
          CharacterService.deleteCharacter(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.charactername = response.data
              console.log(this.charactername)
              this.loadCharacters()
              Vue.nextTick(() => this.$refs.vuetable.refresh()) //
              this.$swal('Deleted', 'You successfully deleted this Character ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Cancelled', 'Your Character still Counts!', 'info')
        }
      })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
