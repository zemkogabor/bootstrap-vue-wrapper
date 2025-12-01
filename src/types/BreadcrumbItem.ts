export default interface BreadcrumbItem {
  route?: {
    name: string
    query?: Record<string, string | number>
    params?: Record<string, string | number>
  },
  title: string;
}
