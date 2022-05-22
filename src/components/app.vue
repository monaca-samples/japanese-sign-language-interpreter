<template>
  <f7-app v-bind="f7params">
    <!-- Right panel with reveal effect-->
    <f7-panel right reveal theme-dark>
      <f7-view>
        <f7-page>
          <f7-navbar title="Right Panel"></f7-navbar>
          <f7-block>{{ text }}</f7-block>
        </f7-page>
      </f7-view>
    </f7-panel>

    <!-- Your main view, should have "view-main" class -->
    <f7-view main class="safe-areas" url="/"></f7-view>
  </f7-app>
</template>
<script>
import { onMounted } from 'vue';
import { f7ready } from 'framework7-vue';
import routes from '../js/routes.js';

export default {
  setup() {
    // Framework7 Parameters
    const f7params = {
      name: '日本手話', // App name
      theme: 'auto', // Automatic theme detection
      routes, // App routes
      navbar: {
        mdCenterTitle: true,
      },
    };
    onMounted(() => {
      f7ready(() => {
        // Call F7 APIs here
      });
    });

    return {
      f7params,
    };
  },
};
</script>
