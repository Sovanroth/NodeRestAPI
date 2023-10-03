import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { random, authenication } from "../helper";

// export const login = async (req: express.Request, res: express.Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.sendStatus(400);
//     }

//     const user = await getUserByEmail(email).select(
//       "+authenication.salt +authenication.password"
//     );

//     if (!user) {
//       return res.sendStatus(400);
//     }

//     const expectedHash = authenication(user.authenication.salt, password);

//     if (user.authenication.password != expectedHash) {
//       return res.sendStatus(403);
//     } 

//     const salt = random();
//     user.authenication.sessionToken = authenication(salt, user._id.toString());

//     await user.save();

//     res.cookie("ANTONIO-AUTH", user.authenication.sessionToken, {
//       domain: "localhost",
//       path: "/",
//     });

//     return res.status(200).json(user).end();
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(400);
//   }
// };

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
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
