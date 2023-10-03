import express from "express";
import authenication from "./authenication";

const router = express.Router();

export default (): express.Router => {
  authenication(router);
  return router;
};
