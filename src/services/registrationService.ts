import RegistrationModel from "../model/registration";
import CourseModel from "../model/course";
import { RegistrationInput } from "../interfaces/registrationInterface";

class RegistrationService {
    public registerForCourse(registrationInput: RegistrationInput) {
        return RegistrationModel.createRegistration(registrationInput);
    }

    public cancelRegistration(registration_id: string) {
        return RegistrationModel.cancelRegistration(registration_id);
    }
}

export default new RegistrationService();