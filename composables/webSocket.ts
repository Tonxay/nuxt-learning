// composables/useWebSocket.ts
import { ref } from "vue";

import { useStorage } from "@vueuse/core";

export function useWebSocket(url: string) {
  const socket = ref<WebSocket>();
  const messages = ref<string[]>([]);
  const isConnected = ref(false);

  const connect = () => {
    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      isConnected.value = true;
      console.log("WebSocket connected");
    };

    socket.value.onmessage = (event) => {
      messages.value.push(event.data);
    };

    socket.value.onclose = () => {
      isConnected.value = false;
      console.log("WebSocket disconnected");
    };
  };

  const sendMessage = (message: string) => {
    if (socket.value && isConnected.value) {
      socket.value.send(message);
    }
  };

  onUnmounted(() => {
    socket.value?.close();
  });

  return {
    connect,
    sendMessage,
    messages,
    isConnected,
  };
}

// composables/useWebSocketListener.ts

export function useWebSocketListener(url: string) {
  const socket = ref<WebSocket>();
  const messages = ref<string[]>([]);
  const isConnected = ref(false);

  const connect = () => {
    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      isConnected.value = true;
      console.log("WebSocket connected");
    };

    socket.value.onmessage = (event) => {
      messages.value.push(event.data);
    };

    socket.value.onclose = () => {
      isConnected.value = false;
      console.log("WebSocket disconnected");
    };
  };

  onUnmounted(() => {
    socket.value?.close();
  });

  return {
    connect,
    messages,
    isConnected,
  };
}

// interface MessengerMessage {
//   text?: string;
//   imageUrl?: string;
//   senderId: string;
//   timestamp: number;
// }

// export function useMessengerSocket(url: string) {
//   const socket = ref<WebSocket>();
//   const messages = ref<MessengerMessage[]>([]);
//   const isConnected = ref(false);

//   const connect = () => {
//     socket.value = new WebSocket(url);

//     socket.value.onopen = () => {
//       isConnected.value = true;
//     };

//     socket.value.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);

//         for (const entry of data.entry || []) {
//           for (const msg of entry.messaging || []) {
//             const { message, sender, timestamp } = msg;
//             if (!message) continue;

//             const parsed: MessengerMessage = {
//               senderId: sender?.id,
//               timestamp,
//               text: message.text,
//               imageUrl: message.attachments?.[0]?.payload?.url,
//             };

//             // messages.value.push(parsed);
//             messages.value.unshift(parsed); // 👈 new message on top
//           }
//         }
//       } catch (e) {
//         console.error("Failed to parse WebSocket message", e);
//       }
//     };

//     socket.value.onclose = () => {
//       isConnected.value = false;
//     };
//   };

//   onUnmounted(() => {
//     socket.value?.close();
//   });

//   return {
//     connect,
//     messages,
//     isConnected,
//   };
// }

interface MessengerMessage {
  text?: string;
  imageUrl?: string;
  senderId: string;
  timestamp: number;
}

// export function useMessengerSocket(url: string) {
//   const socket = ref<WebSocket>();
//   const messages = useStorage<MessengerMessage[]>("cached-messages", []);
//   const isConnected = ref(false);
//   const hasNewMessage = ref(false);

//   const connect = () => {
//     socket.value = new WebSocket(url);

//     socket.value.onopen = () => {
//       isConnected.value = true;
//     };

//     socket.value.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);

//         for (const entry of data.entry || []) {
//           for (const msg of entry.messaging || []) {
//             const { message, sender, timestamp } = msg;
//             if (!message) continue;

//             const parsed: MessengerMessage = {
//               senderId: sender?.id,
//               timestamp,
//               text: message.text,
//               imageUrl: message.attachments?.[0]?.payload?.url,
//             };

//             messages.value.unshift(parsed);
//             hasNewMessage.value = true;
//           }
//         }
//       } catch (e) {
//         console.error("WebSocket parse error", e);
//       }
//     };

//     socket.value.onclose = () => {
//       isConnected.value = false;
//     };
//   };

//   onUnmounted(() => {
//     socket.value?.close();
//   });

//   return {
//     connect,
//     messages,
//     isConnected,
//     hasNewMessage,
//   };
// }

interface MessengerMessage {
  text?: string;
  imageUrl?: string;
  senderId: string;
  timestamp: number;
}

export function useMessengerSocket(url: string) {
  const socket = ref<WebSocket>();
  const messages = useStorage<MessengerMessage[]>("cached-messages", []);
  const isConnected = ref(false);
  const hasNewMessage = ref(false);

  let reconnectTimeout: NodeJS.Timeout | null = null;
  const reconnectDelay = 3000; // ms

  const connect = () => {
    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      isConnected.value = true;
      console.log("[WebSocket] Connected");
    };

    socket.value.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        for (const entry of data.entry || []) {
          for (const msg of entry.messaging || []) {
            const { message, sender, timestamp } = msg;
            if (!message) continue;

            const parsed: MessengerMessage = {
              senderId: sender?.id,
              timestamp,
              text: message.text,
              imageUrl: message.attachments?.[0]?.payload?.url,
            };

            messages.value.unshift(parsed);
            hasNewMessage.value = true;
          }
        }
      } catch (err) {
        console.error("[WebSocket] Parse error", err);
      }
    };

    socket.value.onclose = () => {
      isConnected.value = false;
      console.warn("[WebSocket] Disconnected, retrying in 3s...");
      reconnect();
    };

    socket.value.onerror = (err) => {
      console.error("[WebSocket] Error:", err);
      socket.value?.close();
    };
  };

  const reconnect = () => {
    if (reconnectTimeout) clearTimeout(reconnectTimeout);
    reconnectTimeout = setTimeout(() => {
      connect();
    }, reconnectDelay);
  };

  onUnmounted(() => {
    reconnectTimeout && clearTimeout(reconnectTimeout);
    socket.value?.close();
  });

  return {
    connect,
    messages,
    isConnected,
    hasNewMessage,
  };
}
