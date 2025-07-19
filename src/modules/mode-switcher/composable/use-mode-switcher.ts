import { computed } from "vue";

import useNotify from "src/utils/use-notify";

import useModeSwitcherStore from "src/modules/mode-switcher/store/use-mode-switcher-store";

export default function () {
  const notify = useNotify();

  const modeSwitcherStore = useModeSwitcherStore();

  const isEdit = computed({
    get: () => modeSwitcherStore.isEditMode,
    set: toggleMode,
  });

  const label = computed(() => (isEdit.value ? "редактирования" : "просмотра"));

  function toggleMode() {
    modeSwitcherStore.toggleMode();

    notify.positive({
      message: `Вы переключись в режим <b>${label.value}</b>`,
      html: true,
    });
  }

  return {
    isEdit,
    label,
    toggleMode,
  };
}
