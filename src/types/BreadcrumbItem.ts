export default interface BreadcrumbItem {
  route?: {
    name: string
    query?: string
    params?: Record<string, string | number>
  },
  title: string;
}
