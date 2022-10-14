import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Input, InputGroup, InputPicker, Button } from 'rsuite';
import { register } from './controllers/user.controller';
import bg from '../public/car_bg.jpg'

const Register = () => {

    const route = useRouter()

    const [form,setForm] = useState({
        username : ``,
        password : ``,
        parking_slot_id : '',
        size: '',
        time_log : [],
        invoice : 0
    })

    const dropdown = [
        {label:'Small' , value:'S'},
        {label:'Medium' , value:'M'},
        {label:'Large' , value:'L'},
    ]

    const handleFieldChange = ( name:any , value:string) => {
        setForm({...form , [name]:value})
    }

    const onSubmit = () => {
        const createUser = register(form)
        createUser.then((res)=>{
            if(res.data){
                goToRoute('/login')
            }
        }).catch((e)=>console.log(e))
    }

    const goToRoute = (path:string) => {
        route.push(path)
    }

    return (
        <div className='form-container'>
            <div className='image-container'>
                <Image layout='responsive' alt='sample' src={bg}/>
            </div>
            <div className='form'>
                <h2>REGISTER</h2>
                <InputGroup className='input'>
                    <Input placeholder="username" onChange={(value)=>handleFieldChange('username' , value)}/>
                </InputGroup>
                <InputGroup className='input'>
                    <Input type='password' placeholder="password" onChange={(value)=>handleFieldChange('password' , value)}/>
                </InputGroup>
                <InputGroup >
                    <InputPicker 
                        style={{ width: '100%'}} 
                        data={dropdown}
                        placeholder="car size"
                        value={form.size} 
                        onChange={(e)=>handleFieldChange('size' , e)}
                        labelKey="label"
                        valueKey="value"
                    />
                </InputGroup>
                <Button onClick={onSubmit} className='button' appearance="primary">
                    Sign UP
                </Button>
                <p className='login-link'>Already have an account? <span onClick={()=>goToRoute('/login')}>Sign In</span></p>
            </div>
        </div>
    )
}

export default Register