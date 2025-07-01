export type News = {
  id?: string,
  date: string,
} & {
  [lang: string]: {
    title: string,
    content: string,
  }
}
