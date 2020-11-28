<!--
 * @Author: tian.gao
 * @Date: 2020-11-24 10:36:10
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-25 15:33:36
 * @Description:
-->
<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app {
  /* background: url('https://img95.699pic.com/photo/50050/2419.jpg_wh300.jpg') no-repeat; */
  background-color: rgba(255, 232, 232, 0.87);
  background-size: 2298px 1222px;
  height: 100vh;
}
body{
  margin: 0;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
