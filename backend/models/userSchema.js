import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";   
import jwt from "jsonwebtoken";    


const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 characters"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
        default:"Patient"
    },
    department: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    }
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

const User = mongoose.model("User", userSchema);

export default User;
