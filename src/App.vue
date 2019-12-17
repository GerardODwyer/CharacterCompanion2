<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="./assets/dice.gif" class="img-circle" style="padding: 5px">
      <b-navbar-brand to="/">Character Companion</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/characters"><i class="fa fa-list" style="padding: 5px"> Encounter management</i></b-nav-item>
          <b-nav-item to="/character"><i class="fa fa-male" style="padding: 5px"> Character</i></b-nav-item>
          <b-nav-item to="/weapons"><i class="far fa-swords" style="padding: 5px"> Weapons</i></b-nav-item>
          <b-nav-item to="/weapon"><i class="far fa-sword" style="padding: 5px"> Create Weapon</i></b-nav-item>
          <b-nav-item to="/armours"><i class="far fa-swords" style="padding: 5px"> Armour</i></b-nav-item>
          <b-nav-item to="/armour"><i class="far fa-sword" style="padding: 5px"> Create Armour</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/about"><i class="fa fa-info" style="padding: 5px"> About Us</i></b-nav-item>
          <b-nav-item to="/contact"><i class="fa fa-comment" style="padding: 5px"> Contact Us</i></b-nav-item>
<!--          <b-nav-item><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>-->
<!--          <b-nav-item><i class="fa fa-sign-out" style="padding: 5px"> Logout </i></b-nav-item>-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 20px;
  background: #b1dfbb;
}
.VueTables__sortable {
  cursor: pointer;
}
</style>
