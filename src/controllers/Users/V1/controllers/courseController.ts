import { Request, Response } from "express";
import { CourseInput } from "../../../../model/courseInterfaces";
import { validateDate } from "../../../../utils/helpers";
import { sendResponse, build } from '@util/response';
import courseServicesNew from "../../../../services/course";

/******************** Custom request  ********************/
interface AuthenticatedRequest extends Request {
    user?: { userId: string };
}
/******************** Custom request  ********************/

/**
 * Controller for handling course-related operations
 */
class CourseController {
/**********************************************************************
 * Function Name    :   addCourse
 * Purpose          :   This function is used to addCourse
 * Created By       :   Noor Alam
 * Created Data     :   30April-2025
 * Updated By       :   
 * Update Data      :
 **********************************************************************/
    /**
     * Adds a new course
     * @param {AuthenticatedRequest} req - The request object containing course details
     * @param {Response} res - The response object
     * @returns {Promise<void>} - Promise that resolves when the operation is complete
     */
    public addCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { course_name, instructor_name, start_date, min_employees, max_employees } = req.body;
            if (!course_name || !instructor_name || !start_date || !min_employees || !max_employees) {
                return sendResponse(res, build("ALL_FIELDS_REQUIRED", { failure: {message:"course_name, instructor_name,start_date, min_employees, max_employees cannot be empty"}}));
            }else if (parseInt(min_employees) <= 0 || parseInt(max_employees) <= 0 || parseInt(min_employees) > parseInt(max_employees)) {
                return sendResponse(res, build("INVALID_EMPLOYEE_COUNT", {failure: {message:"Min employees must be less than or equal to max_employees and both must be positive and have value"}}));
            }else if (!validateDate(start_date)) {
                return sendResponse(res, build("INVALID_DATE_FORMAT", {failure: {message: "Date in ddmmyyyy format"}}));
            }
            
            const existingCourse = await courseServicesNew.getCourseByName(course_name);
            if (existingCourse) {
                return sendResponse(res, build("DUPLICATE_COURSE", {failure: {message: "Course with this name already exists"}}));
            }
            
            const day = parseInt(start_date.substring(0, 2), 10);
            const month = parseInt(start_date.substring(2, 4), 10) - 1;
            const year = parseInt(start_date.substring(4, 8), 10);
            const inputDate = new Date(year, month, day);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Normalize current date to midnight
            if (inputDate < currentDate) {
                return sendResponse(res, build("PAST_DATE_ERROR", {failure: {message: "Start date cannot be in the past"}}));
            }else{
            const courseInput: CourseInput = {
                course_name,
                instructor_name,
                start_date,
                min_employees: parseInt(min_employees),
                max_employees: parseInt(max_employees)
            };
            const course = courseServicesNew.createCourse(courseInput);
            return sendResponse(res, build("COURSE_ADDED_SUCCESSFULLY", { success: {course_id: course.course_id }}));
            }
        } catch (error: any) {
            console.log('errorrro', error)
            return sendResponse(res, build("ERROR", { failure: {message: error.message} }));
        }
    }


    /**********************************************************************
     * Function Name    :   allotCourse
     * Purpose          :   This function is used to allotCourse
     * Created By       :   Noor Alam
     * Created Data     :   30April-2025
     * Updated By       :   
     * Update Data      :
     **********************************************************************/
    /**
     * Allots a course to participants
     * @param {AuthenticatedRequest} req - The request object containing course ID
     * @param {Response} res - The response object
     * @returns {Promise<void>} - Promise that resolves when the operation is complete
     */
    public allotCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { course_id } = req.params;
            const results = courseServicesNew.allotCourse(course_id);
            return sendResponse(res, build("COURSE_ALLOTED_SUCCESSFULLY", { sucess: results }));
        } catch (error: any) {
            return sendResponse(res, build("COURSE_ERROR", { failure: {message: error.message} }));
        }
    }
}

export default new CourseController();