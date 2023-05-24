const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

import { validateId, getChecksumFromUUID } from "../../dist/lib/member-id";

describe("Validating an ID", () => {
  // Validation testing primarily handled at end-to-end test level
  it("should validate a valid id", async () => {
    const invalidReason = await validateId(
      "7c8c1cdf-d96e-473c-aa98-ad4a67edb51e_3a6048a15b8c6f166f10bef7357883c07f24ad6a"
    );
    expect(invalidReason).to.be.null;
  });
});

describe("Generating an ID", () => {
  it("should generate the right checksum for a given id", async () => {
    const UUID = "7c8c1cdf-d96e-473c-aa98-ad4a67edb51e";
    const checksum = await getChecksumFromUUID(UUID);
    checksum.should.equal("3a6048a15b8c6f166f10bef7357883c07f24ad6a");
  });
  // TODO: mock crypto calls to get test coverage for generateID
});
