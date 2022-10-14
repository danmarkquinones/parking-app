import React, { useEffect, useState } from 'react'
import { getParkings, updateParking } from './controllers/parking.controller';
import { Grid, Row, Col, Button, InputPicker } from 'rsuite';
import { useUserContext } from './shared/userContext';
import { useRouter } from 'next/router';
import {getShortestDistance} from './shared/globalFunctions';

import ParkingComponent from './shared/ParkingComponent';
import CustomModal from './shared/Modal';

const ParkingMap = () => {

    const [parkings , setParkings] = useState([])
    const [nearestParking , setNearestParking] = useState([])
    const [userDetails , setUserDetails] = useUserContext({})
    const [loading , setLoading] = useState(false)

    const [open, setOpen] = React.useState({visible:false , data:{}});

    const [login , setLogin] = useState(false)
    const route = useRouter()
    
    const [entrance , setEntrance] = useState('')
    const entrances = [
        {label:'ENTRANCE A' , value:'A'},
        {label:'ENTRANCE B' , value:'B'},
        {label:'ENTRANCE C' , value:'C'},
    ]

    useEffect(()=>{
        setLogin(false)
        const userInfo = JSON.parse(localStorage.getItem('userDetails'))
        if(userInfo){
            console.log("userInfo" , userInfo)
            setUserDetails({
                ...userDetails,
                isLoggedIn : userInfo.isLoggedIn,
                info:userInfo.info
            })
            fetchParking()
            setLogin(true)
        }
    },[])

    useEffect(()=>{
        if(entrance){
            
            const size  = userDetails.info.size
            const allowedSizeM = ['M' , 'L']
            
            //filter by vacancy
            let filterData = parkings.filter((el:any)=>!el.occupied)

            if(size === 'M'){
                filterData = filterData.filter((el:any)=>!allowedSizeM.indexOf(el.size))
            }else if(size === 'L'){
                filterData = filterData.filter((el:any)=>el.size==='L')
            }
            console.log("adter sort by size",filterData)

            //filter by shortest distance
            if(entrance==='A'){
                filterData = getShortestDistance(filterData , 0)
            }else if(entrance==='B'){
                filterData = getShortestDistance(filterData , 1)
            }else{
                filterData = getShortestDistance(filterData , 2)
            }

            setNearestParking(filterData)
        }
    },[entrance])

    const fetchParking = () => {
        setLoading(true)
        try{
            const data = getParkings()
            data.then((res)=>{
                setParkings(res.data.data)
                setLoading(false)
            }).catch(e=>console.log(e))
        }catch(e){
            console.log(e)
            setLoading(false)
        }
    }

    const handleLogout = () => {
        route.push('/login')
        localStorage.removeItem('userDetails')
        setUserDetails({...userDetails , isLoggedIn:false , info:{}})
    }

    console.log(userDetails.info.parking_slot_id)

    return (
        <div className='parking-container'>
            {!login ? 
                <div>
                    <p>PLEASE LOG IN FIRST</p>
                </div>
            :loading ?
                <p>FETCHING DATA.... PLEASE WAIT</p>
            :!loading && parkings.length === 0?
                <p>OPPS! SOMETHNG WENT WRONG...</p>
            :<div>
                <div className='header-user'>
                    <h2>Hello , {userDetails.info.username}</h2>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
                <div style={{margin:'20px 0px'}}>
                    <p>Pick your entrance to see the nearest parking space for your size "{userDetails.info.size}" car</p>
                    <InputPicker
                        data={entrances}
                        value={entrance} 
                        onChange={(e)=>setEntrance(e)}
                        labelKey="label"
                        valueKey="value"
                        disabled={userDetails.info.parking_slot_id}
                    />
                </div>
                <Grid fluid>
                    <Row>
                        <Col lg={1} className="vroad">
                            <p></p>
                        </Col>
                        {parkings.filter((_,i)=>i<3).map((parking : any,i:number)=>
                            <Col lg={3} key={i} className='parking-space'>
                                <ParkingComponent 
                                    parking={parking} 
                                    nearestParking={nearestParking}
                                    fetchParking={fetchParking}
                                    setOpen={setOpen}
                                />
                            </Col>
                        )}
                        <Col lg={2} className="vroad">
                            <p 
                                style={{
                                    color:entrance==='B'?'green':'black',
                                    fontWeight:entrance==='B'?'bold':'normal'
                                }}
                            >
                                ENTRANCE B
                            </p>
                        </Col>
                        {parkings.filter((_,i)=>i>=3 && i<7).map((parking : any,i:number)=>
                            <Col lg={3} key={i} className='parking-space'>
                                <ParkingComponent 
                                    parking={parking} 
                                    nearestParking={nearestParking}
                                    fetchParking={fetchParking}
                                    setOpen={setOpen}
                                />
                            </Col>
                        )}
                    </Row>
                    <Row>
                        <Col lg={24} className="hroad">
                            <p
                                style={{
                                    color:entrance==='A'?'green':'black',
                                    fontWeight:entrance==='A'?'bold':'normal'
                                }}
                            >
                                ENTRANCE A
                            </p>
                            <p>
                                EXIT
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={1} className="vroad">
                            <p></p>
                        </Col>
                        {parkings.filter((_,i)=>i>=7 && i <12).map((parking : any,i:number)=>
                            <Col lg={3} key={i} className='parking-space'>
                                <ParkingComponent 
                                    parking={parking} 
                                    fetchParking={fetchParking} 
                                    nearestParking={nearestParking} 
                                    setOpen={setOpen}
                                />
                            </Col>
                        )}
                        <Col lg={2} className="vroad">
                            <p
                                style={{
                                    color:entrance==='C'?'green':'black',
                                    fontWeight:entrance==='C'?'bold':'normal'
                                }}
                            >
                                ENTRANCE C
                            </p>
                        </Col>
                        {parkings.filter((_,i)=>i>=12).map((parking : any,i:number)=>
                            <Col lg={3} key={i} className='parking-space'>
                                <ParkingComponent 
                                    parking={parking} 
                                    fetchParking={fetchParking} 
                                    nearestParking={nearestParking} 
                                    setOpen={setOpen}
                                />
                            </Col>
                        )}
                    </Row>
                </Grid>
            </div>
            
            }

            <CustomModal open={open} setOpen={setOpen} userDetails={userDetails} fetchParking={fetchParking} setUserDetails={setUserDetails}/>
        </div>
    )
}

export default ParkingMap