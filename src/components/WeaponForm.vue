<template>
  <form @submit.prevent="submit">
<!--    <div class="form-group">-->
<!--      <label class="form-label">What type of encounter type is this</label>-->
<!--      <select id="paymenttype" name="paymenttype" class="form-control"-->
<!--              type="text" v-model="paymenttype">-->
<!--        <option value="null" selected disabled hidden>Cchoose type</option>-->
<!--        <option value="Direct">hostile</option>-->
<!--        <option value="PayPal">friendly</option>-->
<!--        <option value="Visa">ork</option>-->
<!--      </select>-->
<!--    </div>-->
    <div class="form-group" :class="{ 'form-group--error': $v.dmgbonus.$error }">
      <label class="form-control-label" name="dmgbonus">damage bonus (Enter a number between 1 and 10)</label>
      <input class="form__input" type="decimal" v-model.trim="dmgbonus"/>
    </div>
    <div class="error" v-if="!$v.dmgbonus.between">damage bonus must be between 1 and 10</div>
    <div class="form-group" :class="{ 'form-group--error': $v.weaponname.$error }">
      <label class="form__label"> Weapon Name</label>
      <input class="form__input" placeholder="enter some weaponname here" v-model.trim="weaponname"/>
    </div>
    <div class="error" v-if="!$v.weaponname.required">weaponname is Required</div>
    <div class="error" v-if="!$v.weaponname.minLength">weaponname must have at least {{$v.weaponname.$params.minLength.min}} letters.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.design.$error }">
      <label class="form__label"> design</label>
      <input class="form__input" placeholder="enter design here" v-model.trim="design"/>
    </div>
    <div class="error" v-if="!$v.design.required">design is Required</div>
    <div class="error" v-if="!$v.design.minLength">design must have at least {{$v.design.$params.minLength.min}} letters.</div>

    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ weaponBtnTitle }}</button>
    </p>
    <p>
      <a href="#/weapons" class="btn btn-primary btn1" role="button">Manage Weapons</a>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">you made a weapon!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Creating weapon...</p>
  </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required, minLength, between } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'FormData',
  props: ['weaponBtnTitle', 'weapon'],
  data () {
    return {
      weaponnametitle: ' Weapon ',
      dmgbonus: this.weapon.dmgbonus,
      weaponname: this.weapon.weaponname,
      design: this.weapon.design,
      submitStatus: null
    }
  },
  validations: {
    weaponname: {
      required,
      minLength: minLength(5)
    },
    dmgbonus: {
      required,
      between: between(1, 10)
    },
    design: {
      required,
      minLength: minLength(5)
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var weapon = {
            // weapon: this.weapon
            _id: this._id,
            dmgbonus: this.dmgbonus,
            weaponname: this.weaponname,
            design: this.design
          }
          console.log('Submitting in WeaponForm : ' +
              JSON.stringify(weapon, null, 5))
          this.$emit('weapon-is-created-updated', weapon)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .weapon-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
