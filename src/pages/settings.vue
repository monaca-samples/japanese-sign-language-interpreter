<template>
  <f7-page name="settings">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-left>
        <f7-link href="/" class="link">
          <f7-icon icon="icon-back"></f7-icon>
        </f7-link>
      </f7-nav-left>
      <f7-nav-right>
        <chip></chip>
      </f7-nav-right>
    </f7-navbar>
    <!-- Page content-->
    <f7-block class="title">
      <h1>{{ $t('settings') }}</h1>
    </f7-block>
    <f7-block strong>
      <f7-range
        :min="250"
        :max="750"
        :label="true"
        :step="5"
        :value="settings.getValue()"
        :scale="true"
        @range:change="changeSettings"
      />
    </f7-block>
    <f7-block class="bottom">
      <p>{{ $t('developed') }}</p>
      <p>{{ $t('version') }}</p>
    </f7-block>
  </f7-page>
</template>

<script>
import { settings } from '../js/settings';
import chip from '../components/chip.vue';

export default {
  components: {
    chip,
  },
  data() {
    const changeSettings = (value) => {
      settings.setValue(value);
    };

    return {
      settings,
      changeSettings,
    };
  },
};
</script>
<style scoped>
.link {
  color: #000000;
}

.title {
  text-align: center;
}

.bottom {
  text-align: center;
  margin-top: 90%;
}
</style>
