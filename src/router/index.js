import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Characters from '@/components/Characters'
import Character from '@/components/Character'
import Weapons from '@/components/Weapons'
import Weapon from '@/components/Weapon'
import Armours from '@/components/Armours'
import Armour from '@/components/Armour'
import AboutUs from '@/components/AboutUs'
import ContactUs from '@/components/ContactUs'
import Edit from '@/components/Edit'
import EditWeapon from '@/components/EditWeapon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/characters',
      name: 'Characters',
      component: Characters
    },
    {
      path: '/character',
      name: 'Character',
      component: Character
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/editWeapon',
      name: 'EditWeapon',
      component: EditWeapon
    },
    {
      path: '/weapons',
      name: 'Weapons',
      component: Weapons
    },
    {
      path: '/weapon',
      name: 'Weapon',
      component: Weapon
    },
    {
      path: '/armours',
      name: 'Armours',
      component: Armours
    },
    {
      path: '/armour',
      name: 'Armour',
      component: Armour
    },
    {
      path: '/about',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/contact',
      name: 'ContactUs',
      component: ContactUs
    }
  ]
})
