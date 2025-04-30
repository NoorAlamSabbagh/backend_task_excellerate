import express, { Application } from "express";
import cookieParser from "cookie-parser";


//course controllers
import userController from "@userController/V1";
// import courseController from "@courseController/V1";


export default (app: Application): void => {
  app.use(cookieParser());

  // User routes 
  app.use("/v1/users", userController); 
  // app.use("/v1/course", courseController); 
};
