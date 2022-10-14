import React, { useEffect, useState } from 'react'
import { Modal , Button } from 'rsuite';
import moment from 'moment'
import { updateParking } from '../controllers/parking.controller';
import { updateUser } from '../controllers/user.controller';
import { useRouter } from 'next/router';

const CustomModal = (props) => {
    const {open , setOpen ,userDetails , setUserDetails, fetchParking} = props
    const timeNow = moment(new Date)
    const [invoice , setInvoice] = useState({hrs:0 , price:0})
    const route = useRouter()

    // console.log(userDetails.info.time_log[0])
    useEffect(()=>{
        if(open.visible){
            let duration = moment.duration(timeNow.diff(userDetails?.info?.time_log[0]));
            let hours = Math.round(duration.asHours());
            let price = 0
            if(hours <= 3){
                price = 40
            }else{
                // if else for rate depending on park size
                if(open.data.size==='S'){
                    price = (hours-3) * 20 //small only
                }else if(open.data.size==='M'){
                    price = (hours-3) * 60
                }else{
                    price = (hours-3) * 100
                }
                
            }
            console.log(hours)
            setInvoice({
                ...invoice,
                hrs:hours,
                price: price
            })
        }
    },[open])

    const handleSubmit = () => {
        const data = {
            parking_id : open.data._id,
            occupied:false,
            occupiedBy:''
        }
        const editParking = updateParking(data)
        editParking.then((res)=>{
            console.log(res)
            const user = {
                user_id:userDetails.info._id,
                parking_slot_id:'',
                time_log:[]
            }
            const editUser = updateUser(user)

            editUser.then((res)=>{
                if(res.data.data){
                    fetchParking()
                    setOpen({...open , visible:false , data:{}})
                    setUserDetails({...userDetails , info : res.data.data})
                    localStorage.setItem('userDetails' , JSON.stringify({
                        isLoggedIn:true,
                        info:res.data.data
                    }))
                }
            }).catch((e)=>console.log(e))
        }).catch((e)=>console.log(e))
    }

    return (
        <Modal open={open.visible} onClose={()=>setOpen({...open , visible:false , data:{}})}>
            <Modal.Header>
            <Modal.Title>Are you sure you want to exit now?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <hr/>
                    <h6>Parking Invoice Details</h6>
                    <hr/>
                    <p>Park size : {open.data.name} - {open.data.size}</p>
                    {open.visible && userDetails.info?
                        <p>Time Parked : {moment(userDetails?.info?.time_log[0]).format('ll-HH:mm:ss')}</p>
                    :null}
                    
                    <p>Time Exit : {moment(timeNow).format('ll-HH:mm:ss')} </p>
                    <p>Total hours stayed : {invoice.hrs} hr</p>
                    <p>Total : {invoice.price} PHP</p>
                    <hr/>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={handleSubmit} appearance="primary">
                Ok, Pay Now!
            </Button>
            <Button onClick={()=>setOpen({...open , visible:false , data:{}})} appearance="subtle">
                Cancel
            </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default CustomModal