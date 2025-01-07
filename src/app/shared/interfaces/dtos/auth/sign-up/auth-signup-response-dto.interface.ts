export interface AuthSignUpResponseDto {
  data: {
    username: string,
    email: string,
    phoneNumber: number,
    firstName: string,
    lastName: string,
    genderTypeId: string,
    genderTypeCode: string,
    cityId: string,
  },
  isSuccess: string,
  message: string,
  httpStatusCode: number,
}
