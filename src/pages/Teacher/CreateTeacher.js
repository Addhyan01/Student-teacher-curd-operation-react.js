import React, { useEffect } from 'react'

export default function CreateTeacher() {

    useEffect(()=>{
        fetch(`http://localhost:1337/api/teachers?populate=*`,{
            method:"GET",
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{

            console.log("Teacher",data.data)
        })
        .catch(()=>{})
    },[]);



        return (
            <div className='container'>CreateTeacher</div>
            
        )
}
