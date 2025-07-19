import { Notify } from "quasar";

import type { INotifyPayload } from "./types";

export default function useNotify() {
  const position = "bottom-right";

  const positive = ({ message, timeout = 700, html = false }: INotifyPayload) => {
    Notify.create({
      type: "positive",
      position,
      timeout,
      html,
      message,
      icon: "",
    });
  };

  const negative = ({ message, timeout = 700, html = false }: INotifyPayload) => {
    Notify.create({
      type: "negative",
      position,
      timeout,
      html,
      message,
      icon: "",
    });
  };

  return {
    positive,
    negative,
  };
}
