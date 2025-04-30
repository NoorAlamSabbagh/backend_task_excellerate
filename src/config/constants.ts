const config = {
    API_KEY: "",

    adminAuthIssuerName: "ADMIN",
    // authTokenAdminAuthExpiresIn: "365 days",
    authTokenAdminAuthExpiresIn: "2592000",  // in seconds

    // schoolAuthIssuerName: "SCHOOL",
    // authTokenSchoolAuthExpiresIn: "2592000",

    authIssuerName: "USER",

    roles: {
        ADMIN: "ADMIN",
        SCHOOL: "SCHOOL",
        TEACHER: "TEACHER",
        STUDENT: "STUDENT",
        PARENT: "PARENT",
    } as const,
};

export default config;
