const Employee = require('../models/EmployeeModel');

const addEmployee = async (req, res, next) => {
    let { name, job, email, salary } = req.body;
    let employee = new Employee({
        name,
        job,
        email,
        salary
    });
    try {
        await employee.save();
    } catch (error) {
        console.log('Error while saving employee data : ', error);
    }
    res.status(201).json({
        success: true,
        employee
    });
}

const getAllEmployee = async (req, res, next) => {
    let employees;
    try {
        employees = await Employee.find();
    } catch (error) {
        console.log('Error while fetching employee data : ', error);
    }
    if(!employees){
        return res.status(404).json({
            success: false,
            message: 'No employee found!'
        });
    }
    return res.status(200).json({
        success: true,
        employees
    });
}

const updateEmployee = async (req, res, next) => {
    let id = req.params.id;
    let employee;
    try {
        employee = await Employee.findByIdAndUpdate(id, req.body);
    } catch (error) {
        console.log('Error while updating employee data : ', error);
    }
    if(!employee){
        return res.status(404).json({
            success: false,
            message: 'No employee found!'
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Employee data updated sucessfully!'
    });
}

const deleteEmployee = async (req, res, next) => {
    let employee;
    let id = req.params.id;
    try {
        employee = await Employee.findByIdAndRemove(id);
    } catch (error) {
        console.log('Error while deleting employee data : ', error);
    }
    if(!employee){
        return res.status(404).json({
            success: false,
            message: 'No employee found!'
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Employee data deleted successfully!'
    });
}

const getEmployeeDetails = async (req, res, next) => {
    let id = req.params.id;
    let employee;
    try {
        employee = await Employee.findById(id);
    } catch (error) {
        console.log('Error while fetching employee details : ', error);
    }
    if(!employee){
        return res.status(404).json({
            success: false,
            message: 'No employee found!'
        });
    }
    return res.status(200).json({
        success: true,
        employeeDetails: employee
    });
}

exports.addEmployee = addEmployee;
exports.getAllEmployee = getAllEmployee;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
exports.getEmployeeDetails = getEmployeeDetails;