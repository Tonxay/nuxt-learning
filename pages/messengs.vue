<!-- <template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-xl font-bold mb-4">Messenger</h1>

    <div class="border p-3 mb-4 h-64 overflow-y-auto bg-gray-100 rounded">
      <div v-for="(msg, index) in messages" :key="index" class="mb-2">
        {{ msg }}
      </div>
    </div>

    <form @submit.prevent="handleSend" class="flex space-x-2">
      <input
        v-model="newMessage"
        type="text"
        class="flex-1 px-3 py-2 border rounded"
        placeholder="Type a message..."
      />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Send
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const { connect, sendMessage, messages } = useWebSocket(
  "wss://api.chat-dd.uk/ws/messages/"
);

const newMessage = ref("");

onMounted(() => {
  connect();
});

const handleSend = () => {
  if (!newMessage.value.trim()) return;
  sendMessage(newMessage.value);
  newMessage.value = "";
};
</script> -->
<!-- 
<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-xl font-bold mb-4">Incoming Messages</h1>

    <div class="border p-3 h-64 overflow-y-auto bg-gray-100 rounded">
      <div v-if="messages.length === 0" class="text-gray-400">
        Waiting for messages...
      </div>
      <div v-for="(msg, index) in messages" :key="index" class="mb-2">
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { connect, messages } = useWebSocketListener(
  "wss://api.chat-dd.uk/ws/messages/"
);

onMounted(() => {
  connect();
});
</script> -->
<!-- 
<template>
  <div class="p-4 max-w-xl mx-auto space-y-4">
    <h1 class="text-2xl font-bold">Messenger by Sender</h1>

    <div
      class="border rounded p-4 h-96 overflow-y-auto bg-white shadow space-y-6"
    >
      <div v-for="[senderId, msgs] in groupedMessages" :key="senderId">
        <div class="font-semibold text-blue-600 mb-2">
          Sender: {{ senderId }}
        </div>
        <div class="space-y-3">
          <div v-for="(msg, index) in msgs" :key="index" class="border-b pb-2">
            <div v-if="msg.text" class="text-gray-800">{{ msg.text }}</div>
            <img
              v-if="msg.imageUrl"
              :src="msg.imageUrl"
              class="mt-2 max-w-full rounded shadow"
              alt="Messenger image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { connect, messages } = useMessengerSocket(
  "wss://api.chat-dd.uk/ws/messages/"
);

// 🔁 Group messages by senderId
const groupedMessages = computed(() => {
  const groups: Record<string, typeof messages.value> = {};

  for (const msg of messages.value) {
    if (!groups[msg.senderId]) {
      groups[msg.senderId] = [];
    }
    groups[msg.senderId].push(msg);
  }

  return Object.entries(groups);
});

onMounted(() => {
  connect();
});
</script> -->

<template>
  <div class="p-4 max-w-xl mx-auto space-y-4">
    <h1 class="text-2xl font-bold">Messenger</h1>

    <div
      v-if="hasNewMessage"
      class="bg-green-100 text-green-700 px-3 py-2 rounded flex items-center justify-between"
    >
      📥 New messages received
      <button @click="hasNewMessage = false" class="text-sm underline ml-4">
        Dismiss
      </button>
    </div>

    <div
      class="border rounded p-4 h-96 overflow-y-auto bg-white shadow space-y-6"
    >
      <div v-for="[senderId, msgs] in groupedMessages" :key="senderId">
        <div class="font-semibold text-blue-600 mb-2">
          Sender: {{ senderId }}
        </div>
        <div class="space-y-3">
          <div v-for="(msg, index) in msgs" :key="index" class="border-b pb-2">
            <div v-if="msg.text" class="text-gray-800">{{ msg.text }}</div>
            <img
              v-if="msg.imageUrl"
              :src="msg.imageUrl"
              class="mt-2 max-w-full rounded shadow"
              alt="Messenger image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { connect, messages, hasNewMessage } = useMessengerSocket(
  "wss://api.chat-dd.uk/ws/messages/"
);

connect();

// Group by senderId
const groupedMessages = computed(() => {
  const groups: Record<string, typeof messages.value> = {};

  for (const msg of messages.value) {
    if (!groups[msg.senderId]) {
      groups[msg.senderId] = [];
    }
    groups[msg.senderId].push(msg);
  }

  return Object.entries(groups);
});
</script>
