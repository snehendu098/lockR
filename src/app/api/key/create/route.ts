import { generateNewKeypair } from "@/helpers/cryptographic-functions";
import { IKeypair } from "@/interfaces";
import dbConnect from "@/lib/db-connect";
import KeypairModel from "@/models/keypair.model";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { address, label }: IKeypair = await req.json();
    const keypair = await generateNewKeypair();

    const dbKeypair = new KeypairModel({
      address,
      label,
      privateKey: keypair.privateKey,
      publicKey: keypair.publicKey,
    });

    await dbKeypair.save();
    if (!dbKeypair) {
      return Response.json(
        { success: false, message: "Error Creating new Keypair" },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Keypair Created Successfully",
        data: dbKeypair,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.log(err);
    return Response.json({ succes: false, message: err.message });
  }
}
