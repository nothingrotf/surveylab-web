export const makeUrlApi = (path: string): string => {
  return `process.env.API_URL${path}`
}
