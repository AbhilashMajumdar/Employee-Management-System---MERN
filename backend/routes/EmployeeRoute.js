const express = require('express');
const { addEmployee, getAllEmployee, updateEmployee, deleteEmployee, getEmployeeDetails } = require('../controllers/EmployeeController');
const router = express.Router();

router.post('/addemployee', addEmployee);
router.get('/employees', getAllEmployee);
router.put('/updateemployee/:id', updateEmployee);
router.delete('/deleteemployee/:id', deleteEmployee);
router.get('/employeedetails/:id', getEmployeeDetails);

module.exports = router;