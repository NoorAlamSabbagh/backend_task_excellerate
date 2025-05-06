import express, { Application } from "express";
import cookieParser from "cookie-parser";


//course controllers
import courseController from "@userController/V1";


export default (app: Application): void => {
  app.use(cookieParser());

  // User routes 
  app.use("/v1/users", courseController); 
};