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
    <div class="form-group" :class="{ 'form-group--error': $v.level.$error }">
      <label class="form-control-label" name="level">level (Enter a number between 1 and 100)</label>
      <input class="form__input" type="decimal" v-model.trim="level"/>
    </div>
    <div class="error" v-if="!$v.level.between">level must be between 1 and 100</div>
    <div class="form-group" :class="{ 'form-group--error': $v.charactername.$error }">
      <label class="form__label"> Character Name</label>
      <input class="form__input" placeholder="enter some charactername here" v-model.trim="charactername"/>
    </div>
    <div class="error" v-if="!$v.charactername.required">charactername is Required</div>
    <div class="error" v-if="!$v.charactername.minLength">charactername must have at least {{$v.charactername.$params.minLength.min}} letters.</div>
    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ characterBtnTitle }}</button>
    </p>
    <p>
      <a href="#/characters" class="btn btn-primary btn1" role="button">Manage Characters</a>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">you made a character!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Creating character...</p>
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
  props: ['characterBtnTitle', 'character'],
  data () {
    return {
      characternametitle: ' Character ',
      charactername: this.character.charactername,
      level: this.character.level,
      upvotes: 0,
      submitStatus: null
    }
  },
  validations: {
    charactername: {
      required,
      minLength: minLength(5)
    },
    level: {
      required,
      between: between(1, 100)
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
          var character = {
            // character: this.character
            _id: this._id,
            level: this.level,
            upvotes: this.upvotes,
            charactername: this.charactername
          }
          console.log('Submitting in CharacterForm : ' +
              JSON.stringify(character, null, 5))
          this.$emit('character-is-created-updated', character)
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
  .character-form .form-control-label.text-left{
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
