import express from 'express';
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointments } from '../controller/appointmentController.js';
import { isPatientAuthenticated,isAdminAuthenticated } from '../middlewares/auth.js';


const router=express();
router.post('/post',isPatientAuthenticated,isAdminAuthenticated,postAppointment)

router.get('/getall',isPatientAuthenticated,isAdminAuthenticated, getAllAppointments)
router.put('/update',isAdminAuthenticated,isPatientAuthenticated,updateAppointments)
router.delete('/delete',isPatientAuthenticated,isAdminAuthenticated,deleteAppointment)



export default router;

