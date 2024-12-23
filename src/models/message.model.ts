import mongoose, { Document, Model, Schema } from "mongoose";
import { IMessage } from "@/interfaces";

// Extend the imported interface with Document
export interface IMessageDocument extends IMessage, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const VoteSchema = new Schema<IMessageDocument>(
  {
    keypairId: {
      type: String,
      required: [true, "Keypair ID is required"],
      trim: true,
      ref: "Keypair", // Reference to Keypair model
    },
    pollId: {
      type: Number,
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
VoteSchema.index({ keypairId: 1 });
VoteSchema.index({ pollId: 1 });
VoteSchema.index({ timestamp: 1 });

// Create and export the model
const VoteModel =
  (mongoose.models.Message as Model<IMessageDocument>) ||
  mongoose.model<IMessageDocument>("Message", VoteSchema);

export default VoteModel;
