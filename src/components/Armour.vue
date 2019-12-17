<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <armour-form :armour="armour" armourBtnTitle="Make Armour"
                          @armour-is-created-updated="submitArmour"></armour-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import ArmourService from '@/services/ArmourService'
import ArmourForm from '@/components/ArmourForm'

export default {
  data () {
    return {
      armour: {armourname: '', shieldbonus: 0, design: '', attribute: ''},
      messagetitle: ' Make Armour '
    }
  },
  components: {
    'armour-form': ArmourForm
  },
  methods: {
    submitArmour: function (armour) {
      ArmourService.postArmour(armour)
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
