<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <!-- <sidebar-link :to="backlogRoute" :name="$t('Estimacion')" icon="tim-icons icon-minimal-right" /> -->

        <sidebar-link v-if="$store.getters.isLoggedIn" :to="{ name: 'Backlog' }" :name="$t('Backlog')" icon="tim-icons icon-bullet-list-67" />
        <sidebar-link v-if="$store.getters.isLoggedIn" :to="{ name: 'Sprint Backlog' }" :name="$t('Sprint Backlog')" icon="tim-icons icon-notes" />
        <sidebar-link v-if="$store.getters.isLoggedIn" :to="{ name: 'Development' }" :name="$t('Desarrollo')" icon="tim-icons icon-delivery-fast" />
        <sidebar-link v-if="$store.getters.isLoggedIn" :to="{ name: 'Retrospective' }" :name="$t('Retrospectiva')" icon="tim-icons icon-check-2" />
        <sidebar-link v-if="$store.getters.isLoggedIn" :to="{ name: 'References' }" :name="$t('Material de Referencia')" icon="tim-icons icon-world" />
        <!-- <sidebar-link :to="{ name: 'Retrospective' }" :name="$t('Manual de Uso')" icon="tim-icons icon-single-02" /> -->
        <!-- <sidebar-link to="/games" :name="$t('Estimacion')" icon="tim-icons icon-minimal-right" /> -->
        <!-- <sidebar-link to="/proceso" :name="$t('Sprint Backlog')" icon="tim-icons icon-minimal-right" /> -->



        <!-- <sidebar-link :to="bbroute" :name="$t('Sprint Backlog')" icon="tim-icons icon-minimal-right" /> -->
        <!-- <sidebar-link :to="{ name: 'SprintBacklogView', params: { gameId: this.$route.params.gameId, groupId: this.$route.params.groupId }}" :name="$t('Sprint Shit')" icon="tim-icons icon-minimal-right" /> -->
        <!-- <sidebar-link to="/proceso" :name="$t('Desarrollo')" icon="tim-icons icon-minimal-right" />
        <sidebar-link to="/proceso" :name="$t('Retrospectiva')" icon="tim-icons icon-minimal-right" /> -->
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
  },
  data() {
    return {
      bbroute: "sprint/new",
      backlogRoute: "backlog",
    }
  }
};
</script>
