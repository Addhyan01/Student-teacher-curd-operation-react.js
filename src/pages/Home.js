import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {


  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([])

  useEffect(() => {


    fetch(`http://localhost:1337/api/students?populate=*`,{
      method:"GET",
  }
  )
  .then((res)=>{ 
      return res.json()
  })
  .then((data)=>{
      
      console.log("Student ----- >",data.data);
      setStudents(data.data);

        
  })
  .catch((err)=>{
      console.log(err)
  })


  fetch(`http://localhost:1337/api/teachers?populate=*`,{
    method:"GET",
})
    
.then((res)=>{
    return res.json()
})
.then((data)=>{
    console.log("Teacher home ----- >",data.data);
    setTeachers(data.data);
})
.catch((err)=>{    
})



    
  }, []);







  return (
    
    

            <>
               <div className='container'>
               <h1 className='text-center mt-5'> Welcome to Dashboard </h1>
            <h3 className='text-center mt-5'> Student Details </h3>
            <br/>
            <Table striped bordered hover id='mytbl'>
                            <thead>
                               
                                <tr>
                                    <th>#</th>
                                    <th>Student  Name</th>
                                    <th>Teachers</th>
                               </tr>
                            </thead>
                            <tbody>

                              {
                                students.map((cv,ind,arr)=>{
                                  return <tr key={ind}>
                                  <td>{cv.id}</td>
                                  <td>{cv.attributes.name}</td>
                                  <td>{
                                    
                                    cv.attributes.teachers.data.map((cv2,idx2,arr2) => {
                                      return cv2.attributes.name+" ";
                                 }).toString()
                                    }</td>


                              </tr>


                                })
                              }
                              

                            </tbody>
                        </Table>
                        <Link to="/student/create"><Button> Edit Student</Button></Link>

                        <h3 className='text-center mt-5'> Teacher Details </h3>
            <br/>
            <Table striped bordered hover id='mytbl'>
                            <thead>
                               
                                <tr>
                                    <th>#</th>
                                    <th>Teacher Name</th>
                                    <th>Student</th>
                               </tr>
                            </thead>
                            <tbody>

                              {
                                teachers.map((cvt,indt,arrt)=>{
                                  return <tr key={indt}>
                                  <td>{cvt.id}</td>
                                  <td>{cvt.attributes.name}</td>
                                  <td>{
                                   cvt.attributes.students.data.map((cv2,idx2,arr2) => {
                                    return cv2.attributes.name+" ";
                               }).toString()
                                    }
                                    </td>
                              </tr> 
                            })}
                              </tbody>
                        </Table>
                        <Link to="/teacher/create"><Button> Edit Teacher</Button></Link>

                      
                 </div>    

    </>
  )
}
