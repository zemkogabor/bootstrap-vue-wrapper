export type TableRow<T extends object = Record<string, unknown>> = T & {
  trClass?: string;
  id?: string | number;
  _showRowDetails?: boolean;
}
