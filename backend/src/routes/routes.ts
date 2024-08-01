import { validateFieldsyup } from "../middleware/validateFieldsYup";
import { getAllStudents, getOneStudent, postStudents, putStudents, RemoveStudents } from "../controllers/controllers";
import { Router } from "express";
import studentSchema from "../validator/validationStudent";

const router = Router();


router.get(
    // #swagger.tags = ['Auth']
    "/getStudents",

    getAllStudents
);


router.get(
    // #swagger.tags = ['Auth']
    "/getStudents/:id",

    getOneStudent
);

router.put(
    // #swagger.tags = ['Auth']
    "/putStudent/:id",
    [validateFieldsyup(studentSchema)],

    putStudents
);


router.put(
    // #swagger.tags = ['Auth']
    "/removeStudent/:id",

    RemoveStudents
);

router.post(
    // #swagger.tags = ['Auth']
    "/postStudent",
    [validateFieldsyup(studentSchema)],

    postStudents
);



export default router;