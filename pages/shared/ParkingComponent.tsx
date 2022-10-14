import React from 'react'
import { Button } from 'rsuite'
import { updateParking } from '../controllers/parking.controller'
import { updateUser } from '../controllers/user.controller'
import moment from 'moment'
import { useUserContext } from './userContext'

const ParkingComponent = (props:any) => {
    const {parking , nearestParking , setOpen , fetchParking } = props
    const [userDetails , setUserDetails] = useUserContext()

    const handleUpdateParking = (value:boolean) => {
        
        const parkingData = {
            parking_id :parking._id,
            occupied : value,
            occupiedBy : value ? userDetails.info._id : ''
        }
        console.log(parkingData)

        const update = updateParking(parkingData)
        update.then((res)=>{
            console.log(res.data.data)
            if(res.data.data){
                editUser(value)
            }
        }).catch((e)=>console.log(e))
    }

    // const handleUpdatePauseParking = () => {
    //     const date = moment().format('')
    //     const userData = {
    //         user_id : userDetails.info._id,
    //         time_log:[...userDetails.info.time_log , date]
    //     }

    //     const update = updateUser(userData)

    //     update.then((res)=>{
    //         setUserDetails({...userDetails , info:res.data.data})
    //     }).catch((e)=>console.log(e))
    // }

    const editUser = (value:boolean) => {
        const date = moment().format('')
        const userData = {
            user_id : userDetails.info._id,
            parking_slot_id: value? parking._id : '',
            time_log:value?[...userDetails.info.time_log , date]:[]
        }

        const update = updateUser(userData)

        update.then((res)=>{
            setUserDetails({...userDetails , isLoggedIn:true , info:res.data.data})
            localStorage.setItem('userDetails' , JSON.stringify({...userDetails , isLoggedIn:true , info:res.data.data}))
            fetchParking()
        }).catch((e)=>console.log(e))
    }

    return (
        <div>
            <p>{parking.name} <span>( {parking.size} )</span></p>
            {nearestParking?.includes(parking._id)? <span className='nearest'>NEAREST</span> : null}
            {   parking.occupiedBy===userDetails.info._id?
                    <span className='parked'>PARKED</span>
                : parking.occupied? 
                    <span className='occupied'>OCCUPIED</span> 
                : <span className='vacant'>VACANT</span>
            }
            {parking.occupiedBy!==userDetails.info._id&&nearestParking?.includes(parking._id)? 
                <div>
                    <Button 
                            appearance="primary"
                            onClick={()=>handleUpdateParking(true)}

                        >
                            PARK HERE
                    </Button>
                </div>
                
            : null}

            {parking.occupiedBy===userDetails.info._id?
                <Button 
                    color="orange"
                    appearance="primary"
                    // onClick={()=>handleUpdateParking(false)}
                    onClick={()=>setOpen({...open , visible:true , data:parking})}
                >
                    UNPARKED
                </Button> 
            :null}
        </div>
    )
}

export default ParkingComponent