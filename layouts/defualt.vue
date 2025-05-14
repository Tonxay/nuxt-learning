<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <!-- Drawer Content -->
      <v-list-item title="Dashboard" prepend-icon="mdi-view-dashboard" />
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- App Bar Content -->
    </v-app-bar>
  </v-app>
</template>

<script setup lang="ts">
const drawer = ref(false);
const router = useRouter();
</script>
