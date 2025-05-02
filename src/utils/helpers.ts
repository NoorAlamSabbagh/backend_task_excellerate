export const generateCourseId = (courseName: string, instructorName: string): string => {
    return `OFFERING-${courseName.toUpperCase().replace(/\s+/g, '-')}-${instructorName.toUpperCase().replace(/\s+/g, '-')}`;
};

export const generateRegistrationId = (employeeName: string, courseName: string): string => {
    return `${employeeName.toUpperCase().replace(/\s+/g, '-')}-${courseName.toUpperCase().replace(/\s+/g, '-')}`;
};

export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validateDate = (date: string): boolean => {
    const re = /^\d{8}$/;
    if (!re.test(date)) return false;
    
    const day = parseInt(date.substring(0, 2), 10);
    const month = parseInt(date.substring(2, 4), 10) - 1;
    const year = parseInt(date.substring(4, 8), 10);
    
    const d = new Date(year, month, day);
    console.log("d", d);
    return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
};
