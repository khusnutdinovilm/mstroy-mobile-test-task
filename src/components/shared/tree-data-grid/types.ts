import type {
  ColDef,
  GetDataPath,
  GetRowIdFunc,
  GetRowIdParams,
  CellEditingStoppedEvent,
  GridApi,
  GridReadyEvent,
} from "ag-grid-enterprise";

export interface ITreeTableProps<T> {
  rowData: T[];
  columnDefs: ColDef[];
  autoGroupColDef: ColDef;
  defaultColDef?: ColDef;
  groupDefaultExpanded?: number;
  minTableWidth?: string;
}

export interface ITreeTableEmits<T> {
  (e: "on-cell-edit-stop", cellData: T): void;
}

export {
  GetDataPath,
  GetRowIdFunc,
  GetRowIdParams,
  CellEditingStoppedEvent,
  GridApi,
  GridReadyEvent,
};
