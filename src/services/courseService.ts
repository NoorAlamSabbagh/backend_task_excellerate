import CourseModel from "../model/course";
import RegistrationModel from "../model/registration";
import { CourseInput } from "../interfaces/courseInterfaces";
import { AllotmentResult } from "../interfaces/registrationInterface";

class CourseService {
    public addCourse(courseInput: CourseInput) {
        return CourseModel.createCourse(courseInput);
    }

    public allotCourse(course_id: string): AllotmentResult[] {
        const course = CourseModel.getCourseById(course_id);
        if (!course) throw new Error('Course not found');

        const registrations = RegistrationModel.getRegistrationsForCourse(course_id);
        
        // Check if minimum employees reached
        const isCancelled = registrations.length < course.min_employees;
        
        // Update registration statuses
        const results: AllotmentResult[] = registrations.map(reg => {
            return {
                registration_id: reg.registration_id,
                email: reg.email,
                course_id: reg.course_id,
                course_name: course.course_name,
                instructor_name: course.instructor_name,
                start_date: course.start_date,
                status: isCancelled ? 'COURSE_CANCELED' : 'CONFIRMED'
            };
        });

        // Sort by registration_id
        results.sort((a, b) => a.registration_id.localeCompare(b.registration_id));

        // Mark course as allotted
        CourseModel.updateCourseAllotmentStatus(course_id, true);

        return results;
    }
}

export default new CourseService();