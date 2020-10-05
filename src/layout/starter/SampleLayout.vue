<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/mod/games" :name="$t('Instructor')" icon="tim-icons icon-settings" />
        <sidebar-link to="/juegos" :name="$t('Estimacion')" icon="tim-icons icon-molecule-40" />
        
        <sidebar-link to="/proceso" :name="$t('Retrospectiva')" icon="tim-icons icon-chart-pie-36" />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./SampleNavbar.vue";
import ContentFooter from "./SampleFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
