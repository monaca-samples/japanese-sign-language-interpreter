<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-left>
        <f7-link href="/settings" class="link">
          <f7-icon f7="gear"></f7-icon>
        </f7-link>
      </f7-nav-left>
      <f7-nav-right>
        <chip></chip>
      </f7-nav-right>
    </f7-navbar>
    <!-- Page content-->
    <f7-block class="title">
      <h1>{{ $t('title') }}</h1>
    </f7-block>
    <div v-show="!loaded" class="text-align-center">
      <div class="preloader"></div>
    </div>
    <f7-block v-show="loaded">
      <f7-row class="justify-content-center text-align-center camera-container">
        <f-card>
          <div class="camera" v-show="!isMobile()">
            <video ref="videoRef" playsinline autoplay></video>
          </div>
          <div class="camera" v-show="isMobile()">
            <img ref="imageRef" src="static/sign.png" />
          </div>
        </f-card>
      </f7-row>
    </f7-block>
    <f7-block class="result-container">
      <h3 class="result">{{ result }}</h3>
    </f7-block>
  </f7-page>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import * as tmImage from '@teachablemachine/image';
import { fetch as fetchPolyfill } from 'whatwg-fetch';
import { i18n } from '../js/app';
import { settings } from '../js/settings';
import chip from '../components/chip.vue';

const isAndroid = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) return true;
  return false;
};

const isIos = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/iPad|iPhone|iPod/i.test(userAgent)) return true;
  return false;
};

export default {
  components: {
    chip,
  },
  setup() {
    const videoRef = ref(null);
    const imageRef = ref(null);
    const usermediaLoaded = ref(false);
    const firstTimePredicted = ref(false);
    const user = ref('何も');
    const result = ref(null);
    const width = 224;
    const height = 224;
    const predictionInterval = settings.getValue();
    const modalTime = 500;
    let modelLoaded = false;
    let model;
    let predictionTimer = null;
    let modelCheckLoop = null;
    let classes;
    let labels;

    // Checks
    const isMobile = () => window.cordova && (isAndroid() || isIos());

    // Calculations
    const classify = (image) => {
      model.predict(image).then((prediction) => {
        let maxProbab = 0;
        let index = 0;
        for (let i = 0; i < classes; i++) {
          if (prediction[i].probability.toFixed(2) > maxProbab) {
            maxProbab = prediction[i].probability.toFixed(2);
            index = i;
          }
        }
        if (!firstTimePredicted.value) {
          firstTimePredicted.value = true;
        } else {
          user.value = prediction[index].className;
        }
      });
    };

    const calculate = () => {
      if (!user.value) {
        result.value = i18n.global.t('何も');
        return;
      }
      result.value = i18n.global.t(user.value);
    };

    // Browser
    const predictBrowser = () => {
      if (!model || !videoRef.value) {
        return;
      }
      predictionTimer = setInterval(() => {
        classify(videoRef.value);
        calculate();
      }, predictionInterval);
    };

    const startUserMedia = () => {
      const constraint = {
        audio: false,
        video: {
          facingMode: 'environment',
          width: {
            min: width,
            ideal: width,
            max: width,
            exact: width,
          },
          height: {
            min: height,
            ideal: height,
            max: height,
            exact: height,
          },
        },
      };
      const handleSuccess = (stream) => {
        usermediaLoaded.value = true;
        videoRef.value.srcObject = stream;
        predictBrowser();
      };
      const handleError = () => {
        usermediaLoaded.value = true;
      };
      navigator.mediaDevices
        .getUserMedia(constraint)
        .then(handleSuccess)
        .catch(handleError);
    };

    // Phone
    const readImageFile = (data) => {
      const protocol = 'file://';
      let filepath = '';
      if (isAndroid()) {
        filepath = protocol + data.output.images.fullsize.file;
      } else {
        filepath = data.output.images.fullsize.file;
      }
      window.resolveLocalFileSystemURL(
        filepath,
        async (fileEntry) => {
          fileEntry.file(
            (file) => {
              const reader = new FileReader();
              reader.onloadend = async () => {
                const blob = new Blob([new Uint8Array(reader.result)], {
                  type: 'image/png',
                });
                imageRef.value.src = window.URL.createObjectURL(blob);
              };
              reader.readAsArrayBuffer(file);
            },
            () => {},
          );
        },
        () => {},
      );
    };

    const startCanvasCamera = () => {
      const options = {
        canvas: {
          width,
          height,
        },
        capture: {
          width,
          height,
        },
        use: 'file',
        fps: 30,
        hasThumbnail: false,
        cameraFacing: 'front',
      };
      window.plugin.CanvasCamera.start(
        options,
        async () => {},
        (data) => {
          readImageFile(data);
        },
      );
    };

    const predictPhone = () => {
      if (!(model && window.plugin && window.plugin.CanvasCamera && imageRef)) {
        if (!(window.plugin && window.plugin.CanvasCamera)) {
          alert('window.plugin.CanvasCamera was not found');
        }
        return;
      }
      startCanvasCamera();
      predictionTimer = setInterval(() => {
        if (!imageRef || !imageRef.value || !imageRef.value.src) return;
        classify(imageRef.value);
        calculate();
      }, predictionInterval);
    };

    const start = async () => {
      if (isMobile()) {
        predictPhone();
      } else {
        predictBrowser();
      }
    };

    const stopLoop = () => {
      clearInterval(modelCheckLoop);
    };

    document.addEventListener(
      'deviceready',
      () => {
        modelCheckLoop = setInterval(() => {
          if (modelLoaded === true) {
            start();
            stopLoop();
          }
        }, modalTime);
      },
      false,
    );

    // Setting up
    onMounted(async () => {
      if (isAndroid()) {
        window.fetch = fetchPolyfill;
      }
      const URL = 'static/model/';
      const modelURL = `${URL}model.json`;
      const metadataURL = `${URL}metadata.json`;
      model = await tmImage.load(modelURL, metadataURL);
      modelLoaded = true;
      classes = model.getTotalClasses();
      labels = model.getClassLabels();
      classify(imageRef.value);
      if (
        !isMobile()
        && navigator.mediaDevices
        && navigator.mediaDevices.getUserMedia
      ) {
        startUserMedia();
      }
    });

    const loaded = computed(() => {
      if (isMobile()) {
        return firstTimePredicted.value;
      }
      return usermediaLoaded.value && firstTimePredicted.value;
    });

    return {
      videoRef,
      imageRef,
      loaded,
      user,
      start,
      result,
      isMobile,
    };
  },
};
</script>

<style scoped>
.camera {
  height: 224px;
  width: 224px;
  overflow: hidden;
}

.camera-container {
  margin-bottom: 5px;
}
.result-container {
  text-align: center;
}

.chip {
  width: 100px;
}
.link {
  color: #000000;
}

.title {
  text-align: center;
}
</style>
