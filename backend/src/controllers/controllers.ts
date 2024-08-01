import { Request, Response } from "express";
import students from "../models/students";
import { FindOptions } from "sequelize";

import { commitTransaction, rollbackTransaction, startTransaction } from "../transaction/transaction";
import { TStudent } from "interfaces/interface";
import { setOFfsetLimit } from "../Pagination/Pagination";

export const getAllStudents = async (req: Request, res: Response) => {

    //@ts-ignore
    const offsetasNumber = Number.parseInt(req.query.offset) || 0
    //@ts-ignore
    const limitasNumber = Number.parseInt(req.query.limit) || 3500
    // This functionality paginates in the back if the offset  and the limit are not passed it shows the first 10 elements
    const { offsetsa, limits ,size} = setOFfsetLimit(offsetasNumber, limitasNumber)
    
    const options: FindOptions = {
        attributes: ['id', 'first_name', 'last_name', 'email', 'age', 'grade'],
        offset: offsetsa,
        limit: limits,
    };
    try {

        const students_array = await students.findAndCountAll(options)       
        return res.status(200).json(students_array.rows)
    } catch (error) {
        await rollbackTransaction();
        return res.status(404).json(`There was an error somewhere`)

    }
}


export const getOneStudent = async (req: Request, res: Response) => {
    const { id } = req.params
    const options: FindOptions = {
        attributes: ['id', 'first_name', 'last_name', 'email', 'age', 'grade'],
        where: { id },

    }

    try {
        const students_element = await students.findOne(options)
        return res.status(200).json(students_element)
    } catch (error) {
        await rollbackTransaction();
        return res.status(404).json(`There was an error somewhere, student cannot be found`)

    }
}



export const postStudents = async (req: Request, res: Response) => {
    await startTransaction();
    const studentsElement: TStudent | any = req.body;
    try {

        await students.create(studentsElement);
        await commitTransaction();
        return res.status(201).json('Student inserted')

    } catch (error) {
        await rollbackTransaction();
        return res.status(404).json('There was an error somewhere , student cannot be posted')

    }

}


export const putStudents = async (req: Request, res: Response) => {
    await startTransaction();
    const { id } = req.params;
    const extinguisher: TStudent | any = req.body;

    try {

        const oldstudent = await students.findByPk(id);
        if (!oldstudent) {

            return res.status(404).json({ msg: 'Student not founded' });
        }
        await oldstudent.update(extinguisher);
        await commitTransaction();
        return res.status(201).json('Student updated ')
    } catch (error) {
        await rollbackTransaction();
        return res.status(404).json(`There was an error somewhere , student cannot be updated`)
    }
};



export const RemoveStudents = async (req: Request, res: Response) => {
    await startTransaction();
    const { id } = req.params;
    const options: FindOptions = {
        attributes: ['*'],
        where: {

            id: id
        },
        paranoid: true,
    };
    try {
        const studentsOld = await students.findOne(options);
        if (studentsOld) {
            await students.destroy({
                where: { id },

            });
        } else {
            return res.status(404).json({ msg: 'Student Not founded' });
        }
        await commitTransaction();
        return res.status(200).json({ msg: 'Student deleted successfully' });

    } catch (error) {
        await rollbackTransaction();
        console.log(error);
        return res.status(404).json({ msg: 'Student could not be deleted successfully' });
    }
};
