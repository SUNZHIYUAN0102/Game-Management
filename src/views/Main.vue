<template>
  <div>
    <div class="container">
      <app-header></app-header>
      <app-list></app-list>
    </div>
  </div>
</template>

<script>
import appHeader from "../components/header.vue";
import appList from "../components/list.vue";
export default {
  components: {
    appHeader,
    appList,
  },
};
</script>

<style scoped>
.container {
  margin: 50px auto;
  width: 800px;
  height: 600px;
  overflow: auto;
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%) !important;
}
</style>