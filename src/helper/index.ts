import crypto from "crypto";
const SECRET = "SOVANROTH-REST-API";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authenication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
