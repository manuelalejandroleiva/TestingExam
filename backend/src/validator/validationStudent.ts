
import { object, number, boolean, string } from 'yup';


const studentSchema=object({
    first_name:string().min(1).max(45).required(),
    last_name:string().min(1).max(45).required(),
    email:string().email().required(),
    age:number().positive().required(),
    grade:number().positive().min(1).max(3).required()
    
})

export default studentSchema


