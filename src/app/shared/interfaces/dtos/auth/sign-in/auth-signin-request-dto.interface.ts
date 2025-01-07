export interface AuthSignInRequestDto {
  username: string | null,
  email: string | null,
  phoneNumber: string | null,
  password: string,
}
