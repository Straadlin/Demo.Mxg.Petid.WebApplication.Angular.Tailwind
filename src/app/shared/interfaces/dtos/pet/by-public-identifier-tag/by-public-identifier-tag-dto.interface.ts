export interface ByPublicIdentifierTagDto {
  data: Data
  errorDetails: string
  isSuccess: boolean
  message: string
  httpStatusCode: number
}

export interface Data {
  id: string
  publicIdentifierTag: string
  name: string
  birthdate: any
  breed: any
  color: string
  weight: any
  distinctiveFeature: any
  notes: string
  publicOwner: any
  publicPhoneNumber: any
  publicEmail: string
  publicAddress: string
  specieTypeId: any
  identifierTagId: string
  createdDate: string
  lastModifiedDate: string | null
  city: City | null
  gender: Gender | null
  vaccines: Vaccine[] | null
  pictures: Picture[] | null
}

export interface City {
  id: string
  name: string
  code: string
  createdDate: string
}

export interface Gender {
  id: string
  code: string
  description: string
  createdDate: string
}

export interface Vaccine {
  id: string
  name: string
  detail: string | null
  vaccineApplied: string
  nextVaccine: string | null
  petId: string
  createdDate: string
  pictures: Picture[] | null
}

export interface Picture {
  uri: string
  createdDate: string
}
