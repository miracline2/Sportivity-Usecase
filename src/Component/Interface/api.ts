export interface IRegisterDetails{
    name: string,
    emailAddress: string,
    yearOfBirth: number
}





export interface IRegisterUserRequest {
    name: string,
    emailAddress: string,
    yearOfBirth: number
}

export interface IRegisterUserResponse {
    success: boolean,
    message: string,
    data: IRegisterUserRequest | null
}

export interface IGetOtp{
      emailAddress: string
      otp: String

}

export interface IGenerateOtpRequest {
    emailAddress: string
}

export interface IGenerateOtpResponse {
    success: boolean,
    message: string,
    data: null
}

export interface IGetOtpByEmailRequest {
    emailAddress: string
}

export interface IGetOtpByEmailResponse {
    success: boolean,
    message: string,
    data: [
        {
            OTP: string,
            success: boolean,
            message: string,
        }
    ] | null
}

export interface IValidateOtpRequest {
    emailAddress: string,
    otp: String
}

export interface IValidateOtpResponse {
    success: boolean,
    message: string,
    data: null
}

export interface IUpdateUserDetailsRequest {
 emailAddress :string,
 name: string,
 phoneNumber : string,
 yearOfBirth: number,
 location : string,
 pinCode : string
}

export interface IUpdateUserDetailsResponse {
    success: boolean,
    message: string,
    data: null

}

export interface IGetUserDetailsRequest{
    emailAddress: string,  
}

export interface IGetUserDetailsResponse{
    success: boolean,
    message: string,
    data: IUpdateUserDetailsRequest | null

}

export interface IGetUserDetails{
    emailAddress :string,
    name: string,
    phoneNumber : string,
    yearOfBirth: number,
    location : string,
    pinCode : string

}