import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { random, authenication } from "helper";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.send(400);
    }

    const existingUser = await getUserByEmail(email);
    const salt = random();
    const user = await createUser({
      email,
      username,
      authenication: {
        salt,
        password: authenication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
