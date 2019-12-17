<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{armournametitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="armours" :options="options">
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editArmour(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteArmour(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import ArmourService from '@/services/ArmourService'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Armours',
  data () {
    return {
      armournametitle: ' Armours List ',
      armours: [],
      props: ['_id'],
      errors: [],
      columns: ['_id', 'armourname', 'shieldbonus', 'design', 'attribute', 'edit', 'remove'],
      options: {
        perPage: 10,
        filterable: ['armourname', 'shieldbonus', 'design', 'attribute'],
        sortable: ['armourname'],
        headings: {
          _id: 'ID',
          armourname: 'Armour Name',
          shieldbonus: 'shieldbonus',
          design: 'design',
          attribute: 'attribute'
        }
      }
    }
  },
  // Fetches Armours when the component is created.
  created () {
    this.loadArmours()
  },
  methods: {
    loadArmours: function () {
      ArmourService.fetchArmours()
        .then(response => {
          // JSON responses are automatically parsed.
          this.armours = response.data
          console.log(this.armours)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    /* upvote: function (id) {
      ArmourService.upvoteArmour(id)
        .then(response => {
          // JSON responses are automatically parsed.
          this.loadArmours()
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },   */
    editArmour: function (id) {
      this.$router.params = id
      this.$router.push('edit')
    },
    deleteArmour: function (id) {
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
          ArmourService.deleteArmour(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.armourname = response.data
              console.log(this.armourname)
              this.loadArmours()
              Vue.nextTick(() => this.$refs.vuetable.refresh()) //
              this.$swal('Deleted', 'You successfully deleted this Armour ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Cancelled', 'Your Armour still Counts!', 'info')
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
