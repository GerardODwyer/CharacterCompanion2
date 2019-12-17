<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
            <weapon-form :weapon="weapon" weaponBtnTitle="Update Weapon"
                            @weapon-is-created-updated="updateWeapon"></weapon-form>
          </template>
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
      weapon: {},
      childDataLoaded: false,
      temp: {},
      messagetitle: ' Update Weapon '
    }
  },
  components: {
    'weapon-form': WeaponForm
  },
  created () {
    this.getWeapon()
  },
  methods: {
    getWeapon: function () {
      WeaponService.fetchWeapon(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.weapon = this.temp
          this.childDataLoaded = true
          console.log('Getting Character in Edit: ' + JSON.stringify(this.weapon, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    updateCharacter: function (weapon) {
      console.log('Before PUT ' + JSON.stringify(weapon, null, 5))
      WeaponService.putWeapon(weapon._id, weapon)
        .then(response => {
          console.log('AFTER PUT ' + JSON.stringify(weapon, null, 5))
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
