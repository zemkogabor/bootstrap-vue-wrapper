export default interface BreadcrumbItem {
  route?: {
    name: string
    query?: string
  },
  title: string;
}
