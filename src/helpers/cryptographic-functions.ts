import { EdDSAKeypair, SignMessageParams } from "@/interfaces";
import { buildEddsa } from "circomlibjs";
import * as utils from "ethers";
import { buildPoseidon } from "circomlibjs";

export async function generateRandomKeypair(): Promise<EdDSAKeypair> {
  try {
    const eddsa = await buildEddsa();

    const privateKey = utils.randomBytes(32);

    const publicKey = eddsa.prv2pub(privateKey);

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
  return keypair;
}

export function convertToHexPublicKey(xArray: string, yArray: string): string {
  const xBuffer = Buffer.from(xArray.split(",").map((item) => Number(item)));
  const yBuffer = Buffer.from(yArray.split(",").map((item) => Number(item)));
  const concatenated = Buffer.concat([xBuffer, yBuffer]);

  return "0x" + concatenated.toString("hex");
}

export function shortenHexString(xArray: string, yArray: string): string {
  const hexString = convertToHexPublicKey(xArray, yArray);

  if (!hexString.startsWith("0x")) {
    throw new Error("String must start with 0x");
  }

  const start = hexString.slice(0, 4);
  const end = hexString.slice(-4);

  return `${start}....${end}`;
}

export function shortenPrivateKey(key: string) {
  const start = key.slice(0, 4);
  const end = key.slice(-3);

  return `${start}....${end}`;
}

export async function signMessage({ privKey, message }: SignMessageParams) {
  try {
    // Initialize EdDSA and Poseidon
    const eddsa = await buildEddsa();
    const poseidon = await buildPoseidon();

    // Remove '0x' prefix if present
    const cleanPrivKey = privKey.startsWith("0x") ? privKey.slice(2) : privKey;

    // Create a buffer from the hex string
    const privateKeyBuffer = Buffer.from(cleanPrivKey, "hex");

    // Convert message to bytes
    const messageBytes = Buffer.from(message, "utf8");

    // Convert bytes to array of numbers
    const messageInts = Array.from(messageBytes);

    // Hash the message integers
    const msgHash = poseidon(messageInts);

    // Sign the message hash
    const signature = eddsa.signPoseidon(privateKeyBuffer, msgHash);

    // Return the signature components
    return {
      R8: signature.R8,
      S: signature.S,
    };
  } catch (error) {
    console.error("Error signing message:", error);
    throw new Error("Failed to sign message");
  }
}

export async function getSignatureHash(signature: {
  R8: any;
  S: any;
}): Promise<string> {
  try {
    // Initialize Poseidon
    const poseidon = await buildPoseidon();

    // Create elements array directly using the field elements
    const sigElements = [
      signature.R8[0], // R8 x coordinate
      signature.R8[1], // R8 y coordinate
      signature.S, // S value
    ];

    // Hash the signature elements
    const hash = poseidon(sigElements);

    // Convert to hex string using the field representation
    return "0x" + poseidon.F.toString(hash);
  } catch (error) {
    console.error("Error creating signature hash:", error);
    throw new Error("Failed to create signature hash");
  }
}
