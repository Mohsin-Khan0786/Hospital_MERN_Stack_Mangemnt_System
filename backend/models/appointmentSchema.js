import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name must contain at least 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name must contain at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [11, "Phone number must contain at least 11 digits"],
        maxLength: [11, "Phone number must contain at most 11 digits"],
    },
    nic: {
        type: String,
        required: true,
        minLength: [13, "NIC must contain at least 13 digits"],
        maxLength: [13, "NIC must contain at most 13 digits"],
        validate: [validator.isNumeric, "Please enter a valid NIC"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is Required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    appointment_Date: {
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    doctor:{
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
    },
    hasVisited:{
        type: Boolean,
        required: true,
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    address:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: ["Pending", "Confirmed", "Cancelled"],
    },


});
export const Appointment=mongoose.model("Appointment",appointmentSchema);


