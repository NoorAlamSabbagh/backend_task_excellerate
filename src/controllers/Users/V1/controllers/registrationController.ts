import { Request, Response } from "express";
import { validateEmail } from "../../../../utils/helpers";
import { sendResponse, build } from '@util/response';
import registrationServicesNew from "../../../../services/registration";
import courseServices from "../../../../services/course";
import {generateRegistrationId} from "../../../../utils/helpers";

/******************** Custom request  ********************/
interface AuthenticatedRequest extends Request {
    user?: { userId: string };
}
/******************** Custom request  ********************/

class RegistrationController {
/**********************************************************************
 * Function Name    :   registerForCourse
 * Purpose          :   This function is used to registerForCourse
 * Created By       :   Noor Alam
 * Created Data     :   30April-2025
 * Updated By       :   
 * Update Data      :
 **********************************************************************/
   public registerForCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> =>{
        try {
            const { course_id } = req.params;
            const { employee_name, email } = req.body;

            // Validate input
            if (!employee_name || !email || !course_id) {
                return sendResponse(res, build("ALL_FIELDS_REQUIRED", { failure: { message: "email and employee_name missing" } }));
            }else if (!validateEmail(email)) {
                return sendResponse(res, build("INVALID_EMAIL_FORMAT", { failure: { message: "Email is required." } }));
            }else {
                const courseData = await courseServices.getCourseById(course_id);
                console.log("courseData", courseData);
                if(!courseData){
                    return sendResponse(res, build("COURSE_ERROR", { failure: { message: "Course not found." } }));
                } else{
                    const totalRegistration = await registrationServicesNew.getRegistrationsForCourse(course_id);
                    let status: 'ACCEPTED' | 'COURSE_FULL_ERROR' | 'COURSE_CANCELED' = 'ACCEPTED';
                    const currentDate = new Date();
                    const deadlineDate = new Date(courseData.start_date);
                    
                    if (currentDate > deadlineDate && totalRegistration.length < courseData?.min_employees) {
                        status = 'COURSE_CANCELED';
                    } else if (totalRegistration.length >= courseData?.max_employees) {
                        status = 'COURSE_FULL_ERROR';
                    } else if (totalRegistration.length < courseData?.min_employees) {
                        status = 'ACCEPTED';
                    }

                    const registration_id = generateRegistrationId(employee_name, courseData.course_name);
                    const registrationInput = {
                        registration_id : registration_id,
                        employee_name : employee_name,
                        email : email,
                        course_id : course_id,
                        status : status
                    };
    
                    //Write code for check user registration with same data 
                    const isAvalible = await registrationServicesNew.getRegistrationByCondition(email, employee_name, course_id);
                    //end
                    if(isAvalible){
                        return sendResponse(res, build("ALREADY_REGISTERED", { failure: { message: "Course already registered." } }));
                    } else{
                        const registration = await registrationServicesNew.createRegistration(registrationInput);
                        if (registration.status === 'COURSE_FULL_ERROR') {
                            return sendResponse(res, build("COURSE_FULL_ERROR", { failure: { message: "Course is full" } }));
                        } else if (registration.status === 'COURSE_CANCELED') {
                            return sendResponse(res, build("COURSE_CANCELED", { failure: { message: "Course has been canceled" } }));
                        }
                        return sendResponse(res, build("SUCCESSFULLY_REGISTERED", { 
                            success: registration.status === 'ACCEPTED' ? {
                                registration_id: registration_id,
                                status: registration.status,
                                course_id: course_id
                            } : registration.status === 'COURSE_FULL_ERROR' ? {
                                registration_id: registration_id,
                                status: registration.status
                            } : {
                                registration_id: registration_id,
                                status: registration.status
                            }
                        }));
                        }
                    }
                }
        } catch (error: any) {
            console.log("error", error.message);
            return sendResponse(res, build("ERROR", { message: error.message }));
        }
    }


/**********************************************************************
 * Function Name    :   cancelRegistration
 * Purpose          :   This function is used to cancelRegistration
 * Created By       :   Noor Alam
 * Created Data     :   30April-2025
 * Updated By       :   
 * Update Data      :
 **********************************************************************/
    public cancelRegistration = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { registration_id } = req.params; 
            const registration = await registrationServicesNew.cancelRegistration(registration_id);
            return sendResponse(res, build("SUCCESSFULLY_CANCELLED", { course_id: registration.course_id, registration_id: registration.registration_id, status: "CANCEL_ACCEPTED" }));
        } catch (error: any) {
            let status = "CANCEL_REJECTED";
            if (error.message.includes('already allotted')) {
                status = "CANCEL_REJECTED";
            }
            return sendResponse(res, build("ERROR", { message: error.message, status }));
        }
    }
}

export default new RegistrationController();