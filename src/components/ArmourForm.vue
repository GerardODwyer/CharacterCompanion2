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

    <div class="form-group" :class="{ 'form-group--error': $v.armourname.$error }">
      <label class="form__label"> Armour Name</label>
      <input class="form__input" placeholder="enter some armourname here" v-model.trim="armourname"/>
    </div>
    <div class="error" v-if="!$v.armourname.required">armourname is Required</div>
    <div class="error" v-if="!$v.armourname.minLength">armourname must have at least {{$v.armourname.$params.minLength.min}} letters.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.shieldbonus.$error }">
      <label class="form-control-label" name="shieldbonus">shieldbonus (Enter a number between 1 and 100)</label>
      <input class="form__input" type="decimal" v-model.trim="shieldbonus"/>
    </div>
    <div class="error" v-if="!$v.shieldbonus.between">shieldbonus must be between 1 and 100</div>

    <div class="form-group" :class="{ 'form-group--error': $v.design.$error }">
      <label class="form__label">  Design</label>
      <input class="form__input" placeholder="enter some design here" v-model.trim="design"/>
    </div>
    <div class="error" v-if="!$v.design.required">design is Required</div>
    <div class="error" v-if="!$v.design.minLength">design must have at least {{$v.design.$params.minLength.min}} letters.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.attribute.$error }">
      <label class="form__label">  Attribute</label>
      <input class="form__input" placeholder="enter some attributes here" v-model.trim="attribute"/>
    </div>
    <div class="error" v-if="!$v.attribute.required">attribute is Required</div>
    <div class="error" v-if="!$v.design.minLength">attribute must have at least {{$v.design.$params.minLength.min}} letters.</div>

    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ armourBtnTitle }}</button>
    </p>
    <p>
      <a href="#/armours" class="btn btn-primary btn1" role="button">Manage Armours</a>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">you made a armour!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Creating armour...</p>
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
  props: ['armourBtnTitle', 'armour'],
  data () {
    return {
      armournametitle: ' Armour ',
      armourname: this.armour.armourname,
      shieldbonus: this.armour.shieldbonus,
      design: this.armour.design,
      attribute: this.armour.attribute,
      submitStatus: null
    }
  },
  validations: {
    armourname: {
      required,
      minLength: minLength(5)
    },
    shieldbonus: {
      required,
      between: between(1, 10)
    },
    design: {
      required,
      minLength: minLength(5)
    },
    attribute: {
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
          var armour = {
            // armour: this.armour
            _id: this._id,
            armourname: this.armourname,
            shieldbonus: this.shieldbonus,
            design: this.armourname,
            attribute: this.attribute
          }
          console.log('Submitting in ArmourForm : ' +
              JSON.stringify(armour, null, 5))
          this.$emit('armour-is-created-updated', armour)
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
  .armour-form .form-control-label.text-left{
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
