import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Input, InputGroup, InputPicker, Button } from 'rsuite';
import { login } from './controllers/user.controller';
import { useUserContext } from './shared/userContext';
import bg from '../public/car_bg.jpg'

const Login = () => {
    const route = useRouter()
    const [userDetails , setUserDetails] = useUserContext()
    console.log(userDetails)
    const [form,setForm] = useState({
        username : ``,
        password : ``,
    })

    const handleFieldChange = ( name:any , value:string) => {
        setForm({...form , [name]:value})
    }

    const onSubmit = () => {
        try{
            const loginUser = login(form)
            loginUser.then((res)=>{
                setUserDetails({
                    ...userDetails,
                    isLoggedIn:true,
                    info:res.data.data
                })
                goToRoute('/parking')
                localStorage.setItem('userDetails' , JSON.stringify({
                    isLoggedIn:true,
                    info:res.data.data
                }))
            }).catch(e=>console.log(e))
        }catch(e){
            console.log(e)
        }
    }

    const goToRoute = (path:string) => {
        route.push(path)
    }

    return (
        <div className='form-container'>
            <div className='form'>
                <h2>LOGIN</h2>
                <InputGroup className='input'>
                    <Input placeholder="username" onChange={(value)=>handleFieldChange('username' , value)}/>
                </InputGroup>
                <InputGroup className='input'>
                    <Input type='password' placeholder="password" onChange={(value)=>handleFieldChange('password' , value)}/>
                </InputGroup>
                <Button onClick={onSubmit} className='button' appearance="primary">
                    Sign In
                </Button>
                <p className='login-link'>Dont have an account? <span onClick={()=>goToRoute('/register')}>Sign Up</span></p>
            </div>
            <div className='image-container'>
                <Image layout='responsive' alt='sample' src={bg}/>
            </div>
        </div>
    )
}

export default Login