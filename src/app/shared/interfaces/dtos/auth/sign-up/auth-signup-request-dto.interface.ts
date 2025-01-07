export interface AuthSignUpRequestDto {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  genderTypeId: string | null,
  cityId: string | null,
}
