import { defineBoot } from "#q-app/wrappers";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { TreeDataModule, RowNumbersModule } from "ag-grid-enterprise";

export default defineBoot(() => {
  ModuleRegistry.registerModules([AllCommunityModule, TreeDataModule, RowNumbersModule]);
});
