import { Request, Response } from "express";
import CourseService from "../../../../services/courseService";
import { CourseInput } from "../../../../interfaces/courseInterfaces";
import { validateDate } from "../../../../utils/helpers";
import { sendResponse, build } from '@util/response';

interface QueryOptions {
    type: 'count' | 'single' | 'many';
    condition: any; // Make condition required
    skip?: number;
    limit?: number;
}


/******************** Custom request  ********************/
interface AuthenticatedRequest extends Request {
    user?: { userId: string };
}
/******************** Custom request  ********************/

/**********************************************************************
 * Function Name    :   addCourse
 * Purpose          :   This function is used to addCourse
 * Created By       :   Noor Alam
 * Created Data     :   30April-2025
 * Updated By       :   
 * Update Data      :
 **********************************************************************/
class CourseController {
    public addCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { course_name, instructor_name, start_date, min_employees, max_employees } = req.body;

            // Validate input
            if (!course_name || !instructor_name || !start_date || !min_employees || !max_employees) {
                // return res.status(400).json({
                //     status: 400,
                //     message: "All fields are required",
                //     data: {
                //         failure: {
                //             message: "All fields are required"
                //         }
                //     }
                // });
                return sendResponse(res, build("ALL_FIELDS_REQUIRED"));
            }

            if (min_employees <= 0 || max_employees <= 0 || min_employees > max_employees) {
                // return res.status(400).json({
                //     status: 400,
                //     message: "Invalid employee count",
                //     data: {
                //         failure: {
                //             message: "min_employees must be less than or equal to max_employees and both must be positive"
                //         }
                //     }
                // });

                return sendResponse(res, build("INVALID_EMPLOYEE_COUNT"));
            }

            if (!validateDate(start_date)) {
                // return res.status(400).json({
                //     status: 400,
                //     message: "Invalid date format",
                //     data: {
                //         failure: {
                //             message: "Date must be in ddmmyyyy format"
                //         }
                //     }
                // });
                return sendResponse(res, build("INVALID_DATE_FORMAT"));
            }

            const courseInput: CourseInput = {
                course_name,
                instructor_name,
                start_date,
                min_employees,
                max_employees
            };

            const course = CourseService.addCourse(courseInput);

            // return res.status(200).json({
            //     status: 200,
            //     message: "course added successfully",
            //     data: {
            //         success: {
            //             course_id: course.course_id
            //         }
            //     }
            // });

            return sendResponse(res, build("COURSE_ADDED_SUCCESSFULLY", { course_id: course.course_id }));
        } catch (error: any) {
            // return res.status(400).json({
            //     status: 400,
            //     message: error.message,
            //     data: {
            //         failure: {
            //             message: error.message
            //         }
            //     }
            // });
            return sendResponse(res, build("ERROR", { message: error.message }));
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
    public allotCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { course_id } = req.params;
            console.log("course_id", course_id);

            const results = CourseService.allotCourse(course_id);
            // return res.status(200).json({
            //     status: 200,
            //     message: "successfully alloted course to registered employees",
            //     data: {
            //         success: results
            //     }
            // });
            return sendResponse(res, build("COURSE_ALLOTED_SUCCESSFULLY", { results }));
        } catch (error: any) {
            // return res.status(400).json({
            //     status: 400,
            //     message: error.message,
            //     data: {
            //         failure: {
            //             message: error.message
            //         }
            //     }
            // });
            return sendResponse(res, build("ERROR", { message: error.message }));
        }
    }
}

export default new CourseController();