import mongoose, { Document, Model, Schema } from "mongoose";
import { IKeypair } from "@/interfaces";

export interface IKeypairDocument extends IKeypair, Document {
  createdAt: Date;
  updatedAt: Date;
}

const KeypairSchema = new Schema<IKeypairDocument>(
  {
    publicKey: {
      type: Object,
      required: [true, "Public key is required"],
      unique: true,
    },
    privateKey: {
      type: String,
      required: [true, "Encrypted private key is required"],
      trim: true,
    },
    label: {
      type: String,
      trim: true,
    },
    lastUsed: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes
KeypairSchema.index({ address: 1 });

// Create and export the model
const KeypairModel =
  (mongoose.models.Keypair as Model<IKeypairDocument>) ||
  mongoose.model<IKeypairDocument>("Keypair", KeypairSchema);

export default KeypairModel;
