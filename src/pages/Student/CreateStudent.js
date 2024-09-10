
import React, { useEffect, useState } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';


export default function CreateStudent() {


    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [teacherName, setTeacherName] = useState([]);
    const [teacherIds, setTeacherIds] = useState([])

    useEffect(()=>{

        //  Here Student  is called by Api 
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
//  Here Theacher is called by Api 
        fetch(`http://localhost:1337/api/teachers`,{
            method:"GET",
        })
            
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log("Teacher ----- >",data.data);
            setTeachers(data.data);
        })
        .catch((err)=>{    
        })
    },[]);


    let createStudent = () => {

        // alert("Student Created Successfully")
        let payload ={
            "data":{
                "name":document.getElementById('student_name').value,
                "teachers": teacherIds
            }
        }

        console.log("payload === >",payload)


        fetch(`http://localhost:1337/api/students`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body : JSON.stringify(payload)
        })
        .then((res)=>{res.json()})
        .then((data)=>{
            alert("Student is successfully Created ");
            // window.location.reload();   ===> this is way to relode whole page but it is not working properly;
            document.querySelector("table#mytbl > tbody").innerHTML += `<tr key={ind}>
                                                                                    <td>1</td>
                                                                                    <td>${document.getElementById('student_name').value}</td>
                                                                                    <td>${teacherName}</td>
                                                                                    
                                                                                    <td>
                                                                                        <Button class="btn btn-sm me-1 btn-success" >View</Button>
                                                                                        <Button class="btn btn-sm me-1 btn-primary">Edit</Button>
                                                                                        <Button class="btn btn-sm me-1 btn-danger" >Delete</Button>

                                                                                </td>
                                                            
                                                                    </tr>`
        })
        .catch((err)=>{
            
        })
    }



    let handleSelect = function(selectedItems) {
        const teacherids = [];
        for(let i=0; i<selectedItems.length;i++){
            teacherids.push(parseInt(selectedItems[i].value));
        }
        setTeacherIds(teacherids)



    };


    let deleteStudent = (e) =>{
        let tr = e.target.closest('tr');
        // console.log(tr.querySelector('td:first-child').innerHTML)
        let sid = tr.querySelector('td:first-child').innerHTML
        
        let x = window.confirm("do you really want to delete stydent")
        if(x === true){

            
        fetch(`http://localhost:1337/api/students/${sid}`,{
            method:"DELETE",

        })
        .then((res)=>{res.json()})
        .then((data)=>{
            console.log(`Student Deleted`);
            alert("Student Suceesfully deleted")
            tr.remove();

            
        })
        .catch((err)=>{
            console.log("Delete Student EDrror = > ", err)

        })

        }

    }

    let handleChange = (e) =>{
        var options = e.target.getElementById("option");
        var optionHtml = options[e.target.selectedIndex].innerHTML;
        setTeacherName(options[e.target.selectedIndex].innerHTML);

    }


                return (
                    <div className='container'>
                        <h1 className='text-center mt-5'>Create Student </h1>




                       
                        

                        <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail"> 
                        <Form.Label>Select Teacher Name:</Form.Label>
                            <Form.Select multiple  value={teacherIds} id='teacher' name="teacher"  onChange={(e)=>{handleSelect(e.target.selectedOptions)}}>

                                    {
                                        teachers.map((cvs, inds, arrs)=>{
                                            // console.log(cvs.id)
                                            return <option key={inds} value={cvs.id}>{cvs.attributes.name}</option>
                                        })
                                    }


                            </Form.Select>

                            </Form.Group> 


                            <Form.Group className="mb-3" >  
                                <Form.Label>Student Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Student Name" id="student_name" />
                                <Form.Text className="text-muted">
                                   
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={()=>{ createStudent() }}>
                                Submit
                            </Button>
                        </Form>
                        <br />
                        <hr />
                        <br />

                        <Table striped bordered hover id='mytbl'>
                            <thead>
                               
                                <tr>
                                    <th>#</th>
                                    <th>Student  Name</th>
                                    <th>Teachers</th>
                                    <th>Action</th>
                               </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map((cv, ind,arr )=>{

                                        return  <tr key={ind}>
                                                    <td>{cv.id}</td>
                                                    <td>{cv.attributes.name}</td>
                                                    <td>{
                                                       
                                                        //    console.log("tchr-->",cv.attributes.teachers.data)
                                                                
                                                        cv.attributes.teachers.data.map((cv2,idx2,arr2) => {
                                                            return cv2.attributes.name+" ";
                                                       }).toString()
                
                

                                                                // console.log('Typr of V ==> ',v.toString())


                                                        }</td>
                                                    <td>
                                                        <Button className="btn btn-sm me-1 btn-success" >View</Button>
                                                        <Button className="btn btn-sm me-1 btn-primary">Edit</Button>
                                                        <Button className="btn btn-sm me-1 btn-danger" id={`sid${cv.id}`} onClick={(e)=>{ deleteStudent(e) }} >Delete</Button>

                                                 </td>
                               
                                     </tr>
                                        
                                    })

                                }
                               
                            </tbody>
                            </Table>
                            <Link to="/"><Button> Dashboard</Button></Link>





                    </div>


                )
}
