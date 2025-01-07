export interface AuthSignInResponseDto {
  data: {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    accessToken: string,
    refreshToken: string,
  },
  isSuccess: string,
  message: string,
  httpStatusCode: number,
}
