import { defineBoot } from "#q-app/wrappers";

import useNotify from "src/utils/use-notify";

export default defineBoot(({ app }) => {
  const notify = useNotify();
  app.config.errorHandler = err => {
    notify.negative({
      message: (err as { message: string }).message || "[ERR]: неизвестная ошибка",
      html: true,
    });
  };
});
