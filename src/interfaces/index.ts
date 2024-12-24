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
