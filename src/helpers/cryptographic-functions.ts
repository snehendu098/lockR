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

// Example usage:
export async function generateNewKeypair() {
  const keypair = await generateRandomKeypair();
  console.log("Private Key:", keypair.privateKey);
  console.log("Public Key X:", keypair.publicKey.x);
  console.log("Public Key Y:", keypair.publicKey.y);
  return keypair;
}
