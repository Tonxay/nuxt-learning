<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          @click="goToPage('/')"
          title="Home"
          prepend-icon="mdi-home"
        />
        <v-list-item
          @click="goToPage('/dashboard')"
          title="Dashboard"
          prepend-icon="mdi-view-dashboard"
        />
        <v-list-item
          @click="goToPage('/settings')"
          title="Settings"
          prepend-icon="mdi-cog"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>My Nuxt 3 App</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "defualt",
});
const drawer = ref(false);
const router = useRouter();

function goToPage(path: string) {
  router.push(path);
  drawer.value = false;
}
</script>
