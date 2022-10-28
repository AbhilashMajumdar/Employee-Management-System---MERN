import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const AddEmployee = () => {

  const history = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: '',
    job: '',
    email: '',
    salary: ''
  });

  const [employeeErr, setEmployeeErr] = useState({
    nameErr: '',
    jobErr: '',
    emailErr: '',
    salaryErr: ''
  });

  let { name, job, email, salary } = employeeData;
  let { nameErr, jobErr, emailErr, salaryErr } = employeeErr;

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const clearEmployeeData = () => {
    setEmployeeData({
      name: '',
      job: '',
      email: '',
      salary: ''
    })
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setEmployeeData({ ...employeeData, [name]: value });
  }

  const postRequest = async () => {
    await axios.post('http://localhost:5000/EMS/addemployee', employeeData);
    // const data = await res.data;
    // return data;
  }

  const clearEmployeeErr = () => {
    setEmployeeErr({
      nameErr: '',
      jobErr: '',
      emailErr: '',
      salaryErr: ''
    });
  }

  const submitEmployeeData = () => {
    if (!name) {
      nameErr = 'Name is required!'
    } else {
      nameErr = ''
    }

    if (!job) {
      jobErr = 'Job is required!'
    } else {
      jobErr = ''
    }

    if (!email) {
      emailErr = 'Email is required!'
    } else if (!email.match(emailRegex)) {
      emailErr = 'Please enter a valid email'
    } else {
      emailErr = ''
    }

    if (!salary) {
      salaryErr = 'Salary is required!'
    } else if (salary - 0 < 10000 || salary - 0 > 200000) {
      salaryErr = 'Salary must be in between 10000 and 200000'
    }
    else {
      salaryErr = ''
    }

    if (nameErr || jobErr || emailErr || salaryErr) {
      setEmployeeErr({ nameErr, jobErr, emailErr, salaryErr });
      return;
    }
    clearEmployeeData();
    clearEmployeeErr();
    postRequest().then(() => history('/viewemployee')).catch((err) => console.log(err));
  }

  return (
    <>
      <div className='row justify-content-center mt-5'>
        <div className="col-md-4 col-10 form-bar text-center">
          <h1>Add Employee</h1>
        </div>
      </div>

      <div className="row justify-content-end">
        <div className="col-md-6 col-12 text-center button-group">
          <Link className='btn btn-success mx-3' to='/viewemployee'>View Employee</Link>
          <Link className='btn btn-warning' to='/searchemployee'>Search Employee</Link>
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-md-5 col-10 text-center form-bar">
          <div className="form-addEmployee">
            <div className="mb-3">
              <input type="text"
                className='form-control text-center'
                placeholder='Enter employee name'
                name='name'
                value={name}
                onChange={(e) => handleInput(e)}
              />
              <p className='my-2 text-danger'>
                {nameErr}
              </p>
            </div>

            <div className="my-3">
              <input type="text"
                className='form-control text-center'
                placeholder='Enter employee job'
                name='job'
                value={job}
                onChange={(e) => handleInput(e)}
              />
              <p className='my-2 text-danger'>
                {jobErr}
              </p>
            </div>

            <div className="my-3">
              <input type="text"
                className='form-control text-center'
                placeholder='Enter employee email'
                name='email'
                value={email}
                onChange={(e) => handleInput(e)}
              />
              <p className='my-2 text-danger'>
                {emailErr}
              </p>
            </div>

            <div className="my-3">
              <input type="text"
                className='form-control text-center'
                placeholder='Enter employee salary'
                name='salary'
                value={salary}
                onChange={(e) => handleInput(e)}
              />
              <p className='my-2 text-danger'>
                {salaryErr}
              </p>
            </div>

            <div className='mt-5 text-center'>
              <Link className='btn btn-danger' to='/'>Cancel</Link>
              <button className='btn btn-warning mx-4' onClick={clearEmployeeData}>Clear</button>
              <Link className='btn btn-primary' onClick={submitEmployeeData}>Submit</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddEmployee