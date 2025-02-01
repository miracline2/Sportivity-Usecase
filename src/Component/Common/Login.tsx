import React, { useState } from 'react';
import logo from '../../assets/logo.svg'
import './LoginRegPage.css'
import signInlogo from '../../assets/signIn.svg'
import { useNavigate } from 'react-router';
import { IGenerateOtpRequest, IGenerateOtpResponse, IGetOtp, IGetOtpByEmailRequest, IGetOtpByEmailResponse, IValidateOtpRequest, IValidateOtpResponse } from '../Interface/api';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { generateOtp, getOtpByEmail, validateOtp } from '../../Service/sportivityApi';

const Registration: React.FC = () => {

     const { register,handleSubmit } = useForm<IGetOtp>()

 const navigate = useNavigate()

const [response, setRespone] = useState<IGetOtpByEmailResponse | null>()

 const {mutate:handleOtpGeneration} = useMutation({
    mutationFn:(data:IGenerateOtpRequest) => generateOtp(data),
    onSuccess:(res:IGenerateOtpResponse, data:any) => {
        if(res.success === true) {
            fetchOtpBYEmail(data)
        }else{
            console.error("Something Went Wrong")
        }
    }
 })


 const handleGenerateOtp = (data:IGetOtp) => {
    event?.preventDefault()
    const request:IGenerateOtpRequest ={
        emailAddress:data.emailAddress
    }
    localStorage.setItem("emailAddress", data.emailAddress);
    handleOtpGeneration(request)  
 }

 const {mutate:getOtp} = useMutation({
    mutationFn:(data:IGetOtpByEmailRequest) => getOtpByEmail(data),
    onSuccess:(response:IGetOtpByEmailResponse) => {
        if(response.success ){
            console.log(response.data)
            setRespone(response)

        }
    }
 })


 const fetchOtpBYEmail = (data:IGetOtp) => {
    const request:IGetOtpByEmailRequest = {
        emailAddress: data.emailAddress
    }
    getOtp(request)
 }

 const {mutate:requestValidOtp} = useMutation({
    mutationFn:(data:IValidateOtpRequest) => validateOtp(data),
    onSuccess:(response:IValidateOtpResponse) =>{
        if(response.success === true){
            navigate('/profile')

        }

    }
 })


 const handleValidation = (data:IGetOtp) => {
    const request:IValidateOtpRequest = {
        emailAddress:data.emailAddress,
        otp:data.otp
    }

    requestValidOtp(request)
 }

    return (
        <div className='d-flex align-items-center justify-content-center mx-auto registration'>
            <div className='d-flex flex-column align-items-center justify-content-center'>

                <div>

                    <img src={logo} alt="" />
                </div>
                <div className='card' style={{ width: '325px' }}>
                    <div className='card-body'>
                        <div className='d-flex  align-items-center justify-center flex-column'>
                        <h4 className='text-md fs-md'>SPORTYVITY</h4>
                        <img src={signInlogo} alt="" />

                        </div>
                        <form onSubmit={handleSubmit(handleGenerateOtp)} >

                            <div className="mb-3">
                                <label aria-placeholder="exampleInputEmail1" className="form-label">Email address</label>
                                <div className='d-flex flex-row '>

                                <div>

                                <input type="email" className="form-control"     id="exampleInputEmail1" aria-describedby="emailHelp" 
                                placeholder='Enter Your email'
                                {...register("emailAddress")}
                                />
                                </div>
                                <div>

                                <button type="submit" className="btn btn-primary "
                                onClick={(e)=>{e.preventDefault,handleGenerateOtp}}

                                >Get OTP</button>
                                </div>
                                </div>
                            </div>
                            </form>
                            <form onSubmit={handleSubmit(handleValidation)}>

                            <div className="mb-3">
                                <label aria-placeholder="exampleInputPassword1" className="form-label">Enter OTP </label>
                                <input type="number" className="form-control" id="exampleInputPassword1"
                                placeholder='Enter 6 digit OTP'

                                {...register("otp")}

                                />
                            </div>
                            <div  className="mb-3">
                                <p className='resendOTP'>Resend OTP</p>

                            </div>
                           <div className='d-grid'>

                            <button type="submit" className="btn btn-primary "
                            onClick={(e)=>{
                                e.preventDefault
                                handleValidation}}
                              >Login </button>
                           </div>
                            </form>
                           <div className='d-flex flex-row gap-3 mt-2'>
                            <div className='login-text'>
                            Don't have an account ?

                            </div>
                            <div className='signUptext' style={{cursor:'pointer'}} onClick={()=>navigate('/Registration')}>
                            Sign Up

                            </div>
                           </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration
