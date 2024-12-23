export interface IKeypair {
  publicKey: string;
  encryptedPrivateKey: string;
  label?: string;
  lastUsed?: Date;
  status: "active" | "inactive";
  address: string;
}

export interface IMessage {
  keypairId: string;
  pollId: number;
  timestamp: Date;
  signedMessage: string;
}
