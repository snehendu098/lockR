import { buildEddsa } from "circomlibjs";
import * as utils from "ethers";

export interface EdDSAPublicKey {
  x: string;
  y: string;
}

export interface EdDSAKeypair {
  publicKey: EdDSAPublicKey;
  privateKey: string;
}

export async function generateRandomKeypair(): Promise<EdDSAKeypair> {
  try {
    // Initialize EdDSA
    const eddsa = await buildEddsa();

    // Generate random 32-byte private key
    const privateKey = utils.randomBytes(32);

    // Generate public key from private key
    const publicKey = eddsa.prv2pub(privateKey);

    // Format the keypair
    return {
      privateKey: utils.hexlify(privateKey),
      publicKey: {
        x: publicKey[0].toString(),
        y: publicKey[1].toString(),
      },
    };
  } catch (error) {
    console.error("Error generating keypair:", error);
    throw new Error("Failed to generate keypair");
  }
}

export async function generateNewKeypair() {
  const keypair = await generateRandomKeypair();
  console.log("Private Key:", keypair.privateKey);
  console.log("Public Key X:", keypair.publicKey.x);
  console.log("Public Key Y:", keypair.publicKey.y);
  return keypair;
}

export function convertToHexPublicKey(xArray: string, yArray: string): string {
  // Convert number arrays to buffers and concatenate
  const xBuffer = Buffer.from(xArray.split(",").map((item) => Number(item)));
  const yBuffer = Buffer.from(yArray.split(",").map((item) => Number(item)));
  const concatenated = Buffer.concat([xBuffer, yBuffer]);

  // Convert to hex string with 0x prefix
  return "0x" + concatenated.toString("hex");
}

export function shortenHexString(xArray: string, yArray: string): string {
  const hexString = convertToHexPublicKey(xArray, yArray);

  if (!hexString.startsWith("0x")) {
    throw new Error("String must start with 0x");
  }

  const start = hexString.slice(0, 4); // Take '0x' plus 2 chars
  const end = hexString.slice(-4); // Take last 3 chars

  return `${start}....${end}`;
}
