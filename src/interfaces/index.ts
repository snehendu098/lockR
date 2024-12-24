export interface IKeypair {
  publicKey: Object;
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
