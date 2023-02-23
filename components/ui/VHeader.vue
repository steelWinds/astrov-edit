<template>
  <!--<NButtonGroup>-->
  <ClientOnly>
    <el-menu
      class="tw-h-12 header-menu"
      mode="horizontal"
      menu-trigger="hover"
      unique-opened
    >
      <el-sub-menu
        :show-timeout="0"
        :hide-timeout="0"
        :popper-offset="0"
        index="1"
        class="header-menu-btn"
      >
        <template #title>
          File
        </template>

        <el-menu-item
          index="1-1"
          @click="options.file = true"
        >
          Open File
        </el-menu-item>

        <el-divider class="tw-my-1" />

        <el-menu-item
          index="1-2"
        >
          New File
        </el-menu-item>

        <el-divider class="tw-my-1" />

        <el-menu-item index="1-3">
          Save
        </el-menu-item>

        <el-menu-item index="1-4">
          Save As
        </el-menu-item>

        <el-divider class="tw-my-1" />

        <el-menu-item index="1-5">
          Change File Type
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu
        :show-timeout="0"
        :hide-timeout="0"
        :popper-offset="0"
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
        :show-timeout="0"
        :hide-timeout="0"
        :popper-offset="0"
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
  </ClientOnly>

  <ClientOnly>
    <el-dialog
      v-model="options.file"
      align-center
      append-to-body
      class="tw-w-5/6 tw-max-w-xl"
      title="Open File"
    >
      <StaticOptionsFileOptions />
    </el-dialog>

    <el-dialog
      v-model="options.theme"
      align-center
      append-to-body
      class="tw-w-5/6 tw-max-w-xl"
      title="Theme Options"
    >
      <StaticOptionsThemeOptions />
    </el-dialog>
  </ClientOnly>

  <!--<NModal
    v-model:show="options.inputType"
    preset="card"
    class="tw-max-w-xl"
    title="Input Type options"
    :bordered="false"
  >
    jopa
  </NModal>-->

  <!--<UtilsRewriteBtns />-->
</template>

<script setup lang="ts">
const options = reactive<Record<string, boolean>>({
  file: false,
  theme: false,
  inputType: false
})
</script>

<style scoped>
.top-panel-grid {
  grid-template-columns: 1fr max-content;
}

.header-menu-btn {
 --el-menu-base-level-padding: 10px;

 border-radius: 0;
}

.header-menu {
  border: 0;

  --el-menu-bg-color: var(--c-mint);
  --el-menu-active-color: var(--c-sky-blue);
  --el-menu-text-color: var(--c-white);
}
</style>
