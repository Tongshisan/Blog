# vue2-previewImage

 预览图片

 在 `vue2` 中不能使用 `<Teleport>` 组件

假如有以下组件
imagePreview.vue
 ```vue
 <script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  // 是否支持 esc 关闭
  keyboard: {
    type: Boolean,
    default: true
  },
  onClose: {
    type: Function,
    default: () => {}
  }
});

const wrapperEl = ref<HTMLDivElement>();

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.keyboard) {
    props.onClose();
  }
}
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <!-- <Teleport to="body"> -->
    <div class="wrapper" ref="wrapperEl">
      <img :src="src" alt="" >
      <CloseIcon size="24" class="close-icon" @click.native="props.onClose"></CloseIcon>
    </div>
  <!-- </Teleport> -->
</template>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  padding-block: 50px;
  background-color: rgba(0, 0, 0, 0.8);

  img {
    width: auto;
    height: 100%;
  }

  .close-icon {
    position: absolute;
    top: 50px;
    right: 50px;
    cursor: pointer;
    color: #d9FFFFFF;
  }
}
</style>

 ```

 可以加一个 index.ts
 ```ts
 import Vue from 'vue';
import ImagePreview from './imagePreview.vue';

interface IOptions {
  src: string;
  keyboard?: boolean;
  onClose?: () => void;
}

class ImagePreviewCreator {
  private _el: Node;
  ImagePreview: any;
  vm: any;
  constructor(options: IOptions) {
    this.ImagePreview = Vue.extend(ImagePreview);
    this.vm = new this.ImagePreview({
      propsData: {
        ...options,
        onClose: () => {
          document.body.removeChild(this._el);
          this.vm.$destroy();
          options.onClose?.();
        },
      },
    }).$mount();
    this._el = this.vm.$el;
    document.body.appendChild(this._el);
  }
}

export const imagePreview = (options: IOptions) => {
  return new ImagePreviewCreator(options);
};

 ```
