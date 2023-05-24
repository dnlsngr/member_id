import crypto from "crypto";

export const getChecksumFromUUID = async (uniqueIdentifier: string) => {
  // Leveraging native crypto capabilities, code pulled from Mozilla docs https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
  const encoder = new TextEncoder();
  const checksumBuffer = await crypto.subtle.digest(
    "SHA-1",
    encoder.encode(uniqueIdentifier)
  );
  const checksumHex = Array.from(new Uint8Array(checksumBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return checksumHex;
};

export const generateId = async () => {
  const uniqueIdentifier: string = crypto.randomUUID();
  const checksum = await getChecksumFromUUID(uniqueIdentifier);
  return uniqueIdentifier + "_" + checksum;
};

export const validateId = async (memberId: string) => {
  //TODO: return an error code and translate messages in the frontend
  const splitid = memberId.split("_");
  if (splitid.length !== 2) {
    return "ID not formatted correctly, should have UUID and SHA1 strings concatenated with an underscore";
  }
  const uuid = splitid[0];
  const checksum = splitid[1];
  const expectedChecksum = await getChecksumFromUUID(uuid);
  if (checksum !== expectedChecksum) {
    return "SHA1 value must encode UUID";
  }
  return null;
};
