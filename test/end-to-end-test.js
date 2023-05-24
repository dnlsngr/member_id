const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

import { appForTest } from "../dist/index";

describe("Making a request", () => {
  it("should return a success and 200 against the healthcheck", async () => {
    const res = await chai.request(appForTest).get("/healthcheck");
    res.should.have.status(200);
    res.text.should.equal("success");
  });

  describe("generate", () => {
    it("should return a valid member object with a generated id", async () => {
      const memberInfoInput = {
        first_name: "Jose",
        last_name: "Vasconcelos",
        dob: "01/01/1981",
        country: "MX",
      };
      const res = await chai
        .request(appForTest)
        .post("/member_id")
        .send(memberInfoInput);
      res.should.have.status(200);
      const memberid = res.body.memberInfo.id;
      memberid.should.be.a("string");
      // TODO: get babel working right in mocha tests to use spread operator here
      let expectedResult = JSON.parse(JSON.stringify(memberInfoInput));
      expectedResult.id = memberid;
      res.body.memberInfo.should.deep.equal(expectedResult);
    });
  });

  describe("validate", () => {
    it("should return a success response for a valid string", async () => {
      const VALID_MEMBER_ID =
        "7c8c1cdf-d96e-473c-aa98-ad4a67edb51e_3a6048a15b8c6f166f10bef7357883c07f24ad6a";
      const res = await chai
        .request(appForTest)
        .post("/member_id/validate")
        .send({ memberid: VALID_MEMBER_ID });
      res.should.have.status(200);
      res.body.should.deep.equal({ isValid: true, invalidReason: null });
    });
    it("should return a clear reason if memberid is formatted incorrectly", async () => {
      const MALFORMATTED_MEMBER_ID =
        "7c8c1cdf-d96e-473c-aa98-ad4a67edb51e_3a6048a15b8c6f166f10bef7357883c07f24ad6a_extratoken123";
      const res = await chai
        .request(appForTest)
        .post("/member_id/validate")
        .send({ memberid: MALFORMATTED_MEMBER_ID });
      res.should.have.status(200);
      //TODO: return an error code and translate messages in the frontend
      res.body.should.deep.equal({
        isValid: false,
        invalidReason:
          "ID not formatted correctly, should have UUID and SHA1 strings concatenated with an underscore",
      });
    });
    it("should return a clear reason if memberid checksum is not valid", async () => {
      const INVALID_MEMBER_ID =
        "7c8c1cdf-d96e-473c-aa98-ad4a67edb51e_3a6048a15b8c6f166f10bef7357883c07f24ad6b";
      const res = await chai
        .request(appForTest)
        .post("/member_id/validate")
        .send({ memberid: INVALID_MEMBER_ID });
      res.should.have.status(200);
      //TODO: return an error code and translate messages in the frontend
      res.body.should.deep.equal({
        isValid: false,
        invalidReason: "SHA1 value must encode UUID",
      });
    });

    it("should fail gracefully if the input is not valid", async () => {
      const res = await chai.request(appForTest).post("/member_id/validate");
      res.should.have.status(422);
      res.body.error.should.not.be.null;
    });
  });
});
