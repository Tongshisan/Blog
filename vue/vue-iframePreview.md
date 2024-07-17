# vue2-iframePreview

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  srcdoc: {
    type: String,
  },
  // 是否支持 esc 关闭
  keyboard: {
    type: Boolean,
    default: true,
  },
  onClose: {
    type: Function,
    default: () => {},
  },
  // 点击蒙层是否关闭
  maskClosable: {
    type: Boolean,
    default: true,
  },
});

const iframeEl = ref<HTMLIFrameElement>();
watch(() => props.srcdoc, (value) => {
  if (!iframeEl.value) {
    return;
  }
  const iframeDocument = iframeEl.value.contentDocument ?? iframeEl.value.contentWindow?.document;
  if (!iframeDocument) {
    return;
  }

  iframeDocument.open();
  iframeDocument.write(value);
  iframeDocument.close();
}, { immediate: true});

const wrapperEl = ref<HTMLDivElement>();

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.keyboard) {
    props.onClose();
  }
};

const handleClick = (e: MouseEvent) => {
  const frameEl = wrapperEl.value?.querySelector('iframe');
  if (e.target !== frameEl && props.maskClosable) {
    props.onClose();
  }
};

const bindIFrameEvent = () => {
  const frameEl = wrapperEl.value?.querySelector('iframe');
  if (!frameEl) return;
  frameEl.addEventListener('load', () => {
    const contentWindow = frameEl.contentWindow;
    if (!contentWindow) return;
    contentWindow.addEventListener('keydown', handleKeydown);
  })
}

const unbindIFrameEvent = () => {
  const frameEl = wrapperEl.value?.querySelector('iframe');
  if (!frameEl) return;
  const contentWindow = frameEl.contentWindow;
  if (!contentWindow) return;
  contentWindow?.removeEventListener('keydown', handleKeydown);
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('click', handleClick);
  bindIFrameEvent();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('click', handleClick);
  unbindIFrameEvent();
});
</script>

<template>
  <!-- <Portal to="body-portal"> -->
  <div class="wrapper" ref="wrapperEl">
    <iframe ref="iframeEl" frameborder="0" src="" srcdoc="" />
    <CloseIcon size="24" class="close-icon" @click.native="props.onClose"></CloseIcon>
  </div>
  <!-- </Portal> -->
</template>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  padding: 50px 100px;
  background-color: rgba(0, 0, 0, 0.8);

  iframe {
    width: 100%;
    height: 100%;
  }

  .close-icon {
    position: absolute;
    top: 50px;
    right: 50px;
    cursor: pointer;
    color: #d9ffffff;
  }
}
</style>

```


**index.ts**

```ts
import Vue from 'vue';
import IframePreview from './iframePreview.vue';

interface IOptions {
  src?: string;
  srcdoc?: string;
  keyboard?: boolean;
  onClose?: () => void;
}

class IframePreviewCreator {
  IframePreview: any;
  private _propsData: IOptions;
  instance: any;
  constructor(options: IOptions) {
    this.IframePreview = Vue.extend(IframePreview);

    this._propsData = Vue.observable({
      ...options,
      onClose: () => {
        document.body.removeChild(this.instance.$el);
        this.instance.$destroy();
        options.onClose?.();
      },
    });

    this.instance = new this.IframePreview({
      propsData: this._propsData,
    });
    // console.log('this.instance', this.instance);
    this.instance.$mount();
    document.body.appendChild(this.instance.$el);
  }

  public updateProps = (key: keyof IOptions, value: any) => {
    // Vue.set(this._propsData, key, value);
    // 因为 instance 是 setup 写的, 更新 this._propsData 没用, 直接更新 instance 上的 props 就可以
    this.instance[key] = value;
  };
}

export const iframePreview = (options: IOptions) => {
  return new IframePreviewCreator(options);
};

```
