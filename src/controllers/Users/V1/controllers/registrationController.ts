import { Request, Response } from "express";
import RegistrationService from "../../../../services/registrationService";
import { validateEmail } from "../../../../utils/helpers";
import { sendResponse, build } from '@util/response';

/******************** Custom request  ********************/
interface AuthenticatedRequest extends Request {
    user?: { userId: string };
}
/******************** Custom request  ********************/

class RegistrationController {
    public registerForCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> =>{
        try {
            const { course_id } = req.params;
            const { employee_name, email } = req.body;

            // Validate input
            if (!employee_name || !email || !course_id) {
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
            if (!validateEmail(email)) {
                // return res.status(400).json({
                //     status: 400,
                //     message: "Invalid email format",
                //     data: {
                //         failure: {
                //             message: "Invalid email format"
                //         }
                //     }
                // });
                return sendResponse(res, build("INVALID_EMAIL_FORMAT"));
            }

            const registrationInput = {
                employee_name,
                email,
                course_id
            };

            const registration = await RegistrationService.registerForCourse(registrationInput);
            if (registration.status === 'COURSE_FULL_ERROR') {
                // return res.status(200).json({
                //     status: 200,
                //     message: `course ${course_id} is full`,
                //     data: {
                //         success: {
                //             registration_id: registration.registration_id,
                //             status: registration.status
                //         }
                //     }
                // });
                return sendResponse(res, build("COURSE_FULL_ERROR"));
            }

            // return res.status(200).json({
            //     status: 200,
            //     message: `successfully registered for ${course_id}`,
            //     data: {
            //         success: {
            //             registration_id: registration.registration_id,
            //             status: registration.status
            //         }
            //     }
            // });
            return sendResponse(res, build("SUCCESSFULLY_REGISTERED", { course_id, registration_id: registration.registration_id, status: registration.status }));
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
            console.log("error", error);
            return sendResponse(res, build("ERROR", { message: error.message }));
        }
    }

    public cancelRegistration = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { registration_id } = req.params; 

            const registration = await RegistrationService.cancelRegistration(registration_id);

            // return res.status(200).json({
            //     status: 200,
            //     message: `successfully cancelled registration for ${registration.course_id}`,
            //     data: {
            //         success: {
            //             registration_id: registration.registration_id,
            //             course_id: registration.course_id,
            //             status: "CANCEL_ACCEPTED"
            //         }
            //     }
            // });
            return sendResponse(res, build("SUCCESSFULLY_CANCELLED", { course_id: registration.course_id, registration_id: registration.registration_id, status: "CANCEL_ACCEPTED" }));
        } catch (error: any) {
            let status = "CANCEL_REJECTED";
            if (error.message.includes('already allotted')) {
                status = "CANCEL_REJECTED";
            }

            // return res.status(400).json({
            //     status: 400,
            //     message: error.message,
            //     data: {
            //         failure: {
            //             message: error.message,
            //             status
            //         }
            //     }
            // });
            return sendResponse(res, build("ERROR", { message: error.message, status }));
        }
    }
}

export default new RegistrationController();