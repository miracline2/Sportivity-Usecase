import {
    IGenerateOtpRequest,

    IGetOtpByEmailRequest,
   
    IGetUserDetailsRequest,
    IGetUserDetailsResponse,
    IRegisterUserRequest,
   
    IUpdateUserDetailsRequest,
    IUpdateUserDetailsResponse,
    IValidateOtpRequest,
   
} from "../Component/Interface/api";
import CommonApiClient from "./commonApi";

export const registerNewUser = async (
    data: IRegisterUserRequest
) => {
    const response = await CommonApiClient.post(
        "/RegisterUser/RegisterUser",
        data
    );
    return response.data;
}

export const generateOtp = async (
    data: IGenerateOtpRequest
) => {
    try{
        
        const response = await CommonApiClient.post(
    
            "/RequestOtp/generateOtp",
            data
        );
        console.log('data',data);
        
        return response.data;
    }catch{
        console.error('Cannot Generate OTP')
    }
}

export const getOtpByEmail = async (
    data: IGetOtpByEmailRequest
) => {
   
    const response = await CommonApiClient.post(
        "/RequestOtp/getOtp",
        data
    );
    return response.data
}

export const validateOtp = async (
    data: IValidateOtpRequest
) => {
    const response = await CommonApiClient.post(
        "/RequestOtp/ValidateOtp",
        data
    );
    return response.data
}

export const UpdateUser = async (
    data: IUpdateUserDetailsRequest
) => {
    const response = await CommonApiClient.post<IUpdateUserDetailsResponse>(
        "/UserDetails/updateProfile",
        data
    );
    return response.data
}

export const getUserDetails = async (
    data: IGetUserDetailsRequest
) => {
    const response = await CommonApiClient.post<IGetUserDetailsResponse>(
        "/UserDetails/getUserProfile",
        data
    );
    return response.data
}
