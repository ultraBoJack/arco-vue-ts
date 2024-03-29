<template>
  <section class="fixed bottom-16 right-16 z-1">
    <div
      class="rounded-full bg-primary text-white w-10 h-10 flex justify-center items-center cursor-pointer"
      @click="openCustomizeThemeSettingDrawer"
    >
      <icon-settings class="setting-icon-rotate" :size="20" />
    </div>
  </section>

  <a-drawer
    :width="420"
    :footer="false"
    :unmount-on-close="false"
    :visible="visible"
    :mask-closable="true"
    @cancel="close"
  >
    <template #title>
      <div class=""> 自定义主题设置 </div>
    </template>
    <section class="p-2 space-y-7">
      <!-- 布局方式 -->
      <section class="space-y-3">
        <div>
          <div class="font-bold">菜单布局方式 </div>
          <div class="text-xs text-gray-500"> 选择: 居左、居右 或 水平</div>
        </div>
        <div>
          <a-grid :cols="3" :col-gap="25">
            <a-grid-item
              v-for="(i, index) in navModeList"
              :key="index"
              class="space-y-1 cursor-pointer relative"
              @click="selectNavMode(i)"
            >
              <svg-icon
                :icon-class="i"
                :class-name="
                  i === activeNavMode
                    ? 'border-primary w-full h-20 border rounded flex flex justify-center items-center'
                    : 'border-gray-200 w-full h-20 border rounded flex flex justify-center items-center'
                "
              />

              <p class="text-center font-bold">{{ i }}</p>
              <div v-if="i === activeNavMode" class="absolute w-5 h-5 right-1 top-0 text-primary">
                <icon-check-circle-fill :size="16" />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
      </section>

      <!-- 颜色主题 -->
      <section class="space-y-3">
        <div>
          <div class="font-bold">颜色主题 </div>
          <div class="text-xs text-gray-500"> 选择: light(浅色) 或 dark(黑色)</div>
        </div>
        <div>
          <a-grid :cols="3" :col-gap="25">
            <a-grid-item
              v-for="(i, index) in navThemeList"
              :key="index"
              class="space-y-1 cursor-pointer relative"
              @click="selectNavTheme(i)"
            >
              <svg-icon
                :icon-class="i"
                :class-name="
                  i === activeNavTheme
                    ? 'border-primary w-full h-20 border rounded flex flex justify-center items-center'
                    : 'border-gray-200 w-full h-20 border rounded flex flex justify-center items-center'
                "
              />
              <p class="text-center font-bold">{{ i }}</p>
              <div v-if="i === activeNavTheme" class="absolute w-5 h-5 right-1 top-0 text-primary">
                <icon-check-circle-fill :size="16" />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
      </section>

      <!-- 布局宽度 -->
      <section class="space-y-3">
        <div>
          <div class="font-bold">布局宽度 </div>
          <div class="text-xs text-gray-500"> 选择: fluid(流式) 或 boxed(盒式)</div>
        </div>
        <div>
          <a-grid :cols="3" :col-gap="25">
            <a-grid-item
              v-for="(i, index) in layoutWidthList"
              :key="index"
              class="space-y-1 cursor-pointer relative"
              @click="selectLayoutWidth(i)"
            >
              <svg-icon
                :icon-class="i"
                :class-name="
                  i === activeLayoutWidth
                    ? 'border-primary w-full h-20 border rounded flex flex justify-center items-center'
                    : 'border-gray-200 w-full h-20 border rounded flex flex justify-center items-center'
                "
              />
              <p class="text-center font-bold">{{ i }}</p>
              <div v-if="i === activeLayoutWidth" class="absolute w-5 h-5 right-1 top-0 text-primary">
                <icon-check-circle-fill :size="16" />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
      </section>

      <section class="space-y-3">
        <div>
          <div class="font-bold">顶部状态栏高度 </div>
          <div class="text-xs text-gray-500"> 选择: 小、中、大</div>
        </div>
        <div>
          <a-radio-group v-model="activeHeaderHeight" type="button" @change="changeHeaderHeight">
            <a-radio v-for="(i, index) in headerHeightOptions" :key="index" :value="i.value">{{ i.text }}</a-radio>
          </a-radio-group>
        </div>
      </section>

      <section class="space-y-3">
        <div class="font-bold">侧边栏宽度(px) </div>
        <div>
          <a-slider
            v-model="activeSidebarWidth"
            :default-value="sidebarWidth"
            :min="160"
            :max="300"
            :style="{ width: '200px' }"
            @change="changeSidebarWidth"
          />
        </div>
      </section>

      <section class="space-y-3">
        <div class="font-bold">顶部状态栏是否固定 </div>
        <a-switch v-model="activeHeaderFixed" @change="changeHeaderFixed" />
      </section>

      <section class="space-y-3">
        <div class="font-bold">是否显示页脚 </div>
        <a-switch v-model="activeFooterHeight" @change="changeFooterDisplay" />
      </section>
    </section>
  </a-drawer>
</template>

<script lang="ts" setup name="UserProfile">
  import { ComputedRef, ref } from 'vue'
  import { LAYOUT_WIDTH, NAV_THEME, NAV_MODE } from '@/enums/pageEnum'
  import useProjectSettingStore from '@/store/modules/projectSetting'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  import settings, { IHeaderHeightOption, headerHeightOptions } from '@/settings/projectSetting'

  const { sidebarWidth } = settings

  const navModeList = ref(Object.values(NAV_MODE))
  const layoutWidthList = ref(Object.values(LAYOUT_WIDTH))
  const navThemeList = ref(Object.values(NAV_THEME))

  const {
    getLayoutWidth,
    getNavTheme,
    getNavMode,
    getFooterDisplay,
    getHeaderHeight,
    getHeaderFixed,
    getSidebarWidth,
  } = useProjectSetting()

  const navMode = ref<ComputedRef<NAV_MODE>>(getNavMode)
  const navTheme = ref<ComputedRef<NAV_THEME>>(getNavTheme)
  const layoutWidth = ref<ComputedRef<LAYOUT_WIDTH>>(getLayoutWidth)
  const footerDisplay = ref<ComputedRef<boolean>>(getFooterDisplay)
  console.log('🚀 ~ file: index.vue ~ line 155 ~ footerDisplay', footerDisplay.value)

  const projectSettingStore = useProjectSettingStore()

  const visible = ref(false)

  const openCustomizeThemeSettingDrawer = () => {
    visible.value = true
  }

  // 设置布局方式
  const activeNavMode = ref<NAV_MODE>(navMode.value)
  const selectNavMode = (item: NAV_MODE) => {
    activeNavMode.value = item
    projectSettingStore.setNavMode(item)
  }

  // 设置布局宽度
  const activeLayoutWidth = ref<LAYOUT_WIDTH>(layoutWidth.value)
  const selectLayoutWidth = (item: LAYOUT_WIDTH) => {
    activeLayoutWidth.value = item
    projectSettingStore.setLayoutWidth(item)
  }

  // 设置颜色主题
  const activeNavTheme = ref<NAV_THEME>(navTheme.value)
  const selectNavTheme = (item: NAV_THEME) => {
    activeNavTheme.value = item
    projectSettingStore.setNavTheme(item)
  }

  // 设置顶部状态库高度
  const activeHeaderHeight = ref<IHeaderHeightOption['value']>(getHeaderHeight.value.value)
  const changeHeaderHeight = (val: string) => {
    const currentItem = headerHeightOptions.find((item: IHeaderHeightOption) => item.value === val)
    if (currentItem) {
      activeHeaderHeight.value = currentItem?.value
      projectSettingStore.setHeaderHeight(currentItem)
    }
  }

  // 侧边栏宽度
  const activeSidebarWidth = ref<number>(getSidebarWidth.value)
  const changeSidebarWidth = (val: number) => {
    activeSidebarWidth.value = val
    projectSettingStore.setSidebarWidth(val)
  }

  // 设置是否固定顶部状态栏
  const activeHeaderFixed = ref<boolean>(getHeaderFixed.value)
  const changeHeaderFixed = (val: boolean) => {
    activeHeaderFixed.value = val
    projectSettingStore.setHeaderFixed(val)
  }

  // 设置显示/隐藏页脚
  const activeFooterHeight = ref<boolean>(footerDisplay.value)
  const changeFooterDisplay = (val: boolean) => {
    projectSettingStore.setFooterDisplay(val)
    activeFooterHeight.value = val
  }

  const close = () => {
    visible.value = false
  }
</script>

<style scoped lang="less">
  .setting-icon-rotate {
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .theme-drawer :deep(.arco-drawer-header) {
  }
</style>
