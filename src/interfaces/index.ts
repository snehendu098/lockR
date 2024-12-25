export interface IKeypair {
  publicKey: { x: string; y: string };
  privateKey: string;
  label?: string;
  lastUsed?: Date;
  status: "active" | "inactive";
  address: string;
}

export interface IMessage {
  keypairId: string;
  timestamp: Date;
  signedMessage: string;
  identifier: string;
}

export interface SignMessageParams {
  privKey: string;
  message: string;
}

export interface EdDSAPublicKey {
  x: string;
  y: string;
}

export interface EdDSAKeypair {
  publicKey: EdDSAPublicKey;
  privateKey: string;
}
