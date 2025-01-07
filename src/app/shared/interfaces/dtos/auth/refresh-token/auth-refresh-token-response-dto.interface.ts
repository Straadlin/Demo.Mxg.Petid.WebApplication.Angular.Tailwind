export interface AuthRefreshTokenResponseDto {
  data: {
    accessToken: string,
    refreshToken: string,
    success: string,
    errors: string[],
  },
  isSuccess: string,
  message: string,
  httpStatusCode: number,
}
