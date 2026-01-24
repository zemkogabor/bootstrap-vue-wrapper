export interface TableRowMeta {
  trClass?: string;
  id?: string | number;
  _showRowDetails?: boolean;
}

export type TableRow = TableRowMeta & {
  [key: string]: unknown;
}
