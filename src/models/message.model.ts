import mongoose, { Document, Model, Schema } from "mongoose";
import { IMessage } from "@/interfaces";

// Extend the imported interface with Document
export interface IMessageDocument extends IMessage, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const MessageSchema = new Schema<IMessageDocument>(
  {
    keypairId: {
      type: String,
      required: [true, "Keypair ID is required"],
      trim: true,
      ref: "Keypair",
    },
    identifier: {
      type: String,
      required: [true, "Poll ID is required"],
    },
    timestamp: {
      type: Date,
      required: [true, "Timestamp is required"],
      default: Date.now,
    },
    signedMessage: {
      type: String,
      required: [true, "Signed message is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for common queries
MessageSchema.index({ keypairId: 1 });
MessageSchema.index({ timestamp: 1 });

// Create and export the model
const MessageModel =
  (mongoose.models.Message as Model<IMessageDocument>) ||
  mongoose.model<IMessageDocument>("Message", MessageSchema);

export default MessageModel;
