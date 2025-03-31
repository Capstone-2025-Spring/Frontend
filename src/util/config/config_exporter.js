import { saveAs } from "file-saver";
import { useConfigStore } from "../../store/config_store";

export const exportConfigToJson = () => {
  const { user_options } = useConfigStore.getState();
  const blob = new Blob([JSON.stringify(user_options, null, 2)], {
    type: "application/json",
  });
  saveAs(blob, "user_config.json");
};
