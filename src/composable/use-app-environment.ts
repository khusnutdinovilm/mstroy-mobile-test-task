import { useQuasar } from "quasar";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

export default function useAppEnvironment() {
  const $q = useQuasar();

  const isMobile = computed(() => $q.platform.is.mobile);
  const isOnline = ref(navigator.onLine);

  const updateStatus = () => (isOnline.value = navigator.onLine);

  const canSaveData = computed(() => isMobile.value && isOnline.value);

  onMounted(() => {
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("online", updateStatus);
    window.removeEventListener("offline", updateStatus);
  });

  return {
    isMobile,
    isOnline,
    canSaveData,
  };
}
