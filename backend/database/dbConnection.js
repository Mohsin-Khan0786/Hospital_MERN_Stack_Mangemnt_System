import mongoose from "mongoose";
export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"Mern_stack"
})
.then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.error(`Failed to connect to database,${err}`);
})
}
