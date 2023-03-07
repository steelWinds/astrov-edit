<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { OnClickOutside } from '@vueuse/components'
import { useFilesStore } from '@/store/files-store'

const filesStore = useFilesStore()

const options = reactive<Record<string, boolean>>({
  theme: false,
  createFile: false
})
const refMenu = ref<{ close:(index: string) => any } | null>(null)
const currentSubmenuIdx = ref('')

const tabletAndLarger = useBreakpoints({ tablet: 764 })
  .greaterOrEqual('tablet')

const menuTriggerType = computed<'click' | 'hover'>(
  () => tabletAndLarger.value ? 'hover' : 'click'
)

const onOpenSubmenu = (idx: string) => {
  currentSubmenuIdx.value = idx
}

const closeCurrentSubmenu = () => {
  refMenu.value?.close(currentSubmenuIdx.value)
}

const openFile = elMessage(async () => {
  await filesStore.openFile()
}, { success: 'Opened file succesfully' })

const openDir = elMessage(async () => {
  await filesStore.openDir()
}, { success: 'Opened folder succesfully' })
</script>

<template>
  <ClientOnly>
    <OnClickOutside @trigger="closeCurrentSubmenu">
      <el-menu
        ref="refMenu"
        class="tw-h-12 !tw-px-3 md:tw-h-10"
        mode="horizontal"
        :menu-trigger="menuTriggerType"
        unique-opened
        @open="(idx) => onOpenSubmenu(idx)"
      >
        <el-sub-menu
          index="1"
          class="header-menu-btn"
        >
          <template #title>
            File
          </template>

          <el-menu-item
            index="1-1"
            @click="openFile"
          >
            Open File
          </el-menu-item>

          <el-menu-item
            index="1-2"
            @click="openDir"
          >
            Open Folder
          </el-menu-item>

          <el-divider class="tw-my-1" />

          <el-menu-item
            index="1-3"
            @click="options.createFile = true"
          >
            New File
          </el-menu-item>

          <el-divider class="tw-my-1" />

          <el-menu-item index="1-4">
            Save
          </el-menu-item>

          <el-menu-item
            v-if="!filesStore.isLegacyMode"
            index="1-5"
          >
            Save As
          </el-menu-item>

          <el-divider class="tw-my-1" />

          <el-menu-item index="1-6">
            Change File Type
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu
          index="2"
          class="header-menu-btn"
        >
          <template #title>
            View
          </template>

          <el-menu-item
            index="2-1"
            @click="options.theme = true"
          >
            Theme Settings
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu
          index="3"
          class="header-menu-btn"
        >
          <template #title>
            Profile
          </template>

          <el-menu-item index="3-1">
            Log In
          </el-menu-item>

          <el-menu-item index="3-2">
            Sign Up
          </el-menu-item>

          <el-menu-item
            index="3-3"
            disabled
          >
            My Profile
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </OnClickOutside>
  </ClientOnly>

  <ClientOnly>
    <el-dialog
      v-model="options.theme"
      align-center
      draggable
      append-to-body
      class="!tw-w-5/6 !tw-max-w-xl"
      title="Theme Options"
    >
      <StaticOptionsThemeOptions />
    </el-dialog>

    <el-dialog
      v-model="options.createFile"
      draggable
      append-to-body
      class="!tw-w-5/6 !tw-max-w-xl"
      title="File name"
    >
      <FormsCreateFileForm />
    </el-dialog>
  </ClientOnly>
</template>

<style scoped>
.top-panel-grid {
  grid-template-columns: 1fr max-content;
}

.header-menu-btn {
 --el-menu-base-level-padding: 10px;

 border-radius: 0;
}
</style>
