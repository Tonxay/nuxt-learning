<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <!-- Drawer Content -->
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- App Bar Content -->
    </v-app-bar>

    <v-main>
      <v-container>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const drawer = ref(false);
const router = useRouter();

function goToPage(path: string) {
  router.push(path);
  drawer.value = false;
}
</script>
