# Japanese Sign Language Interpreter

Mobile application developed using Vue3, Monaca, Framework 7 and Teachable Machine, which recognises gestures from the Japanese Sign Language and converts them to Japanese text, with the possibility of translating them into English or Spanish.

This app is based on a template found here:
[framework7-vue3-minimal](https://github.com/monaca-templates/framework7-vue3-minimal)

### Tutorial

There is a tutorial available in Medium: [Create a simple Sign Language Recognition App using Teachable Machine, Monaca, Vue.js and Framework7](https://medium.com/p/31072c2456a4)

### How to use

1. Fork or download the repository.
3. Start the server locally with `npm run start`, or using Monaca.

### Testing

You need to build a [custom Monaca Debugger](https://en.docs.monaca.io/products_guide/debugger/installation/debugger_ios#building-a-custom-monaca-debugger) which contains [CanvasCamera](https://www.npmjs.com/package/com.virtuoworks.cordova-plugin-canvascamera) plugin.
