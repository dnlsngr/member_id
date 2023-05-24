import express from "express";
export const memberRoutes = express.Router();

import { validateId, generateId } from "../lib/member-id";

// TODO: better country library
enum CountryType {
  US = "US",
  MX = "MX",
}
export interface MemberInfo {
  id: string;
  first_name: string;
  last_name: string;
  dob: string;
  country: CountryType;
}
export interface ValidationResponse {
  isValid: boolean;
  invalidReason: string | null;
}

// HTML
memberRoutes.get("/validate", async (req: express.Request, res: any) => {
  return res.sendFile("public/validate.html", { root: __dirname + "/../.." });
});

// API
const validationResponse = (invalidReason: string | null) => {
  const resp: ValidationResponse = {
    isValid: invalidReason == null,
    invalidReason,
  };
  return resp;
};

memberRoutes.post("/", async (req: express.Request, res: any) => {
  console.log("received request on POST /member-id/");
  //TODO: Validate body if we are going to expand the use case for this
  const memberId = await generateId();
  const memberInfo = { id: memberId, ...req.body };
  return res.status(200).send({ memberInfo });
});
memberRoutes.post("/validate", async (req: express.Request, res: any) => {
  const { memberid } = req.body;
  if (!memberid) {
    console.log(
      "received invalid request on POST /member-id/validate with body " +
        req.body
    );
    return res
      .status(422)
      .send({ error: "Must supply a memberid in request body" });
  }
  console.log(
    "received request on POST /member-id/validate for id " + memberid
  );
  const invalidReason = await validateId(memberid);
  return res.status(200).send(validationResponse(invalidReason));
});
