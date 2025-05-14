<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="!users">No data</div>
  <div v-else>
    <div
      v-for="user in users"
      :key="user.id"
      class="p-4 border rounded shadow mb-4"
    >
      <h2 class="font-bold text-lg">{{ user.name }}</h2>
      <p>ID: {{ user.id }}</p>
      <p>Age: {{ user.createdAt }}</p>
      <p>Address: {{ user.avatar }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { users, loading, error, fetchUsers } = useUsers();

onMounted(() => {
  fetchUsers();
});
</script>
