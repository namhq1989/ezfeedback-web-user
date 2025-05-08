import { IMe } from '@/app/models/user'

//
// REQUEST VERIFICATION CODE
//

export interface IRequestVerificationCodeRequest {
  email: string
}

export interface IRequestVerificationCodeResponse {}

//
// VERIFY VERIFICATION CODE
//

export interface IVerifyVerificationCodeRequest {
  code: string
  email: string
}

export interface IVerifyVerificationCodeResponse {
  isNewUser: boolean
  token: string
}

//
// GET ME
//

export interface IGetMeRequest {}

export interface IGetMeResponse {
  me: IMe
}
