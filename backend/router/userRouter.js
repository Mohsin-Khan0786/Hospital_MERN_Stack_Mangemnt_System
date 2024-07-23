import  express  from 'express';
import { addNewAdmin, addNewDoctor, getAllDocters, getPatientDetails, getUserDetails, login,logoutAdmin,logoutpatient,patientRegister } from '../controller/userController.js';
import { isAdminAuthenticated,isPatientAuthenticated } from '../middlewares/auth.js';
const  router=express.Router()

router.post('/patient/register', patientRegister)
router.post('/login', login)
router.post('/admin/addnew',addNewAdmin)
router.get('/doctor',getAllDocters)
router.get('/admin/me',isAdminAuthenticated,getUserDetails)
router.get('/patient/me',isAdminAuthenticated,getPatientDetails)
router.get('/admin/logout',isAdminAuthenticated,logoutAdmin)
router.get('/patient/logout',isPatientAuthenticated,logoutpatient)
router.post('/doctor/addnew',isAdminAuthenticated,addNewDoctor)


export default router;

