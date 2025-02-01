import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/logo.svg'
import './LoginRegPage.css'
import { IRegisterDetails, IRegisterUserRequest, IRegisterUserResponse } from '../Interface/api';
import { useForm } from 'react-hook-form';
import { useMutation } from "@tanstack/react-query";
import { registerNewUser } from '../../Service/sportivityApi';
import { useNavigate } from 'react-router';

const Registration: React.FC = () => {
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [value, setValue] = useState<IRegisterDetails | null>()
    const [error, setError] = useState({})
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<IRegisterDetails>()

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', () => {

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            initializeCaptcha(ctx);
        })
    }, []);
    const generateRandomChar = (min: any, max: any) =>
        String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

    const generateCaptchaText = () => {
        let captcha = '';
        for (let i = 0; i < 3; i++) {
            captcha += generateRandomChar(65, 90);
            captcha += generateRandomChar(97, 122);
            captcha += generateRandomChar(48, 57);
        }
        return captcha.split('').sort(
            () => Math.random() - 0.5).join('');
    };
    const drawCaptchaOnCanvas = (ctx: any, captcha: any) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
        const letterSpace = 150 / captcha.length;
        for (let i = 0; i < captcha.length; i++) {
            const xInitialSpace = 25;
            ctx.font = '20px Roboto Mono';
            ctx.fillStyle = textColors[Math.floor(
                Math.random() * 2)];
            ctx.fillText(
                captcha[i],
                xInitialSpace + i * letterSpace,

                // Randomize Y position slightly
                Math.floor(Math.random() * 16 + 25),
                100
            );
        }
    };
    const initializeCaptcha = (ctx: any) => {
        setUserInput('');
        const newCaptcha = generateCaptchaText();
        setCaptchaText(newCaptcha);
        drawCaptchaOnCanvas(ctx, newCaptcha);
    };

  



const {mutate:updateNewUser, } = useMutation({
    mutationFn:(data:IRegisterUserRequest) => registerNewUser(data),
    onSuccess:(response:IRegisterUserResponse) => {
        if(response.success === true){
            navigate('/profile')
        }
        else{
            console.error('Something Went Wrong')
        }

    }
})


   const handleFormSubmit = (data:IRegisterDetails) => {
    event?.preventDefault()
    const request:IRegisterUserRequest = {
        name:data.name,
        emailAddress:data.emailAddress,
        yearOfBirth:data.yearOfBirth

    }
 updateNewUser(request)
 localStorage.setItem("emailAddress", data.emailAddress);
    console.log('Form request',request)
   }


    return (
        <div className='d-flex align-items-center justify-content-center mx-auto registration'>
            <div className='d-flex flex-column align-items-center justify-content-center'>

                <div>

                    <img src={logo} alt="" />
                </div>
                <div className='card' style={{ width: '500px' }}>
                    <div className='card-body'>
                        <div className='d-flex  align-items-center justify-center flex-column'>
                        <h4 className='text-md fs-md'>SPORTYVITY</h4>
                        <p className='fs-sm signUptext'>Sign Up</p>

                        </div>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="mb-3">
                                <label aria-placeholder="Name" className="form-label">Name</label>
                                <input type="Name" className="form-control" id="Name" aria-describedby="Name"
                                
                                // name='name' placeholder='Enter Yor name here'
                                value={value?.name}
                                // onChange={handleOnChange}
                                {...register('name')}
                               
                                
                                />
                            </div>
                            <div className="mb-3">
                                <label aria-placeholder="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                 placeholder='Enter Yor Email here'
                                value={value?.emailAddress}
                                // onChange={handleOnChange}
                                {...register("emailAddress")}
                                />
                            </div>
                            <div className="mb-3">
                                <label aria-placeholder="exampleInputPassword1" className="form-label">Year of Birth </label>
                                <input type="number" className="form-control" id="exampleInputPassword1"
                                // name='yearOfBirth' 
                                placeholder='-----'
                                value={value?.yearOfBirth}
                                // onChange={handleOnChange}
                                {...register("yearOfBirth")}
                                />
                            </div>
                            <div className="mb-3 ">

                                <label className="form-check-label" aria-placeholder="exampleCheck1">Captcha</label>
                                <div className='d-flex flex-row  gap-3'>
                                    <div className='container d-flex   gap-3 flex-row'>

                                        <div className='wrapper'>
                                            

                                            <canvas ref={canvasRef} 
                                                width='200px'
                                                height='50px'
                                            >

                                            </canvas> 
                                        </div>
                                        <p className='text-sm-start text-wrap mt-3 signUptext ' style={{ cursor: 'pointer' }}
                                            onClick={
                                                () => initializeCaptcha(canvasRef.current.getContext('2d'))}
                                        >
                                            Refresh Captcha
                                        </p>

                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary " style={{ width: '450px' }}
                             >Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration