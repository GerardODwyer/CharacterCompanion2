<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <weapon-form :weapon="weapon" weaponBtnTitle="Make Weapon"
                          @weapon-is-created-updated="submitWeapon"></weapon-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import WeaponService from '@/services/WeaponService'
import WeaponForm from '@/components/WeaponForm'

export default {
  data () {
    return {
      weapon: {dmgbonus: 0, weaponname: '', design: ''},
      messagetitle: ' Make Weapon '
    }
  },
  components: {
    'weapon-form': WeaponForm
  },
  methods: {
    submitWeapon: function (weapon) {
      WeaponService.postWeapon(weapon)
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
