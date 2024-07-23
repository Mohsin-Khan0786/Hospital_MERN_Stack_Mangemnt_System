export const catchAsyncErrors=(thefunction)=>{
   return async (req,res,next)=>{
    Promise.resolve(thefunction(req,res,next)).catch(next)

    }
}
export default catchAsyncErrors;