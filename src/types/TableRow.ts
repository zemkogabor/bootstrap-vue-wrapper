export default interface TableRow {
  trClass?: string;
  id?: string | number;
  _showRowDetails?: boolean;
  [key: string]: object | string | number | boolean | undefined;
}
