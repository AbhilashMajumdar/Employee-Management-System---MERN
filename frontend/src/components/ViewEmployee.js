import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react'

const ViewEmployee = () => {
  
  let [data, setData] = useState([]);

  const getAllEmployeesData = async () => {
    const res = await axios.get('http://localhost:5000/EMS/employees').catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }

  const fetchEmployeeData = () => {
    getAllEmployeesData().then(data => setData(data.employees));
  }

  useEffect(() => {
    getAllEmployeesData().then(data => setData(data.employees))
  }, []);

  const deleteEnployee = async (id) => {
    const res = await axios.delete(`http://localhost:5000/EMS/deleteemployee/${id}`)
      .then(()=>fetchEmployeeData()).catch((err)=>console.log(err));
    const data = await res.data;
    return data;
  }

  return (
    <>
      <div className="row justify-content-center mt-5 mb-2">
        <div className="col-md-4 col-10 text-center search-heading">
          <h1>Employee Details</h1>
        </div>
      </div>

      <div className="row justify-content-end">
        <div className="col-md-4 col-12 text-center button-group">
          <Link className='btn btn-success mx-3' to='/addemployee'>Add Employee</Link>
          <Link className='btn btn-warning' to='/searchemployee'>Search Employee</Link>
        </div>
      </div>

      <div className="row justify-content-center my-5">
        <div className="col-md-10 col-10 text-center">
          <div className='table-responsive'>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Job</th>
                  <th scope="col">Email</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((emp, i) => {
                    return <tr key={i}>
                      <td>{emp._id}</td>
                      <td>{emp.name}</td>
                      <td>{emp.job}</td>
                      <td>{emp.email}</td>
                      <td>{emp.salary}</td>
                      <td>
                        <Link className='btn btn-outline-success' to={`/employee/${emp._id}`}>View</Link>
                        <Link className='btn btn-outline-primary mx-3' to={`/editemployee/${emp._id}`}>Edit</Link>
                        <button className='btn btn-outline-danger' onClick={()=>deleteEnployee(emp._id)}>Delete</button>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewEmployee