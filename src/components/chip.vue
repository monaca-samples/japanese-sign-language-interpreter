<template>
  <f7-chip smart-select :smart-select-params="{ openIn: 'sheet' }">
    <template #media>
      <img :src="$t('img')" />
    </template>
    <select @change="changeLanguage($event)" name="language" v-model="key">
      <option
        v-for="(lang, i) in langs"
        :key="`lang-${i}`"
        :value="lang"
        :selected="lang === selectedLang"
      >
        {{ $t(lang) }}
      </option>
    </select>
  </f7-chip>
</template>

<script>
import { i18n } from '../js/app';

export default {
  setup() {
    let selectedLang = i18n.global.locale;
    const langs = ['ja', 'es', 'en'];

    // Change language function
    const changeLanguage = (event) => {
      i18n.global.locale = event.target.value;
      selectedLang = event.target.value;
    };
    return {
      changeLanguage,
      selectedLang,
      langs,
    };
  },
};
</script>
