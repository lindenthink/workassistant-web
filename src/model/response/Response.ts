export default class Response<T> {
  success: boolean
  message: string[] = []
  data: T
}
