import {
  getSignatureHash,
  signMessage,
} from "@/helpers/cryptographic-functions";
import KeypairModel from "@/models/keypair.model";
import MessageModel from "@/models/message.model";

export async function POST(req: Request) {
  try {
    const {
      id,
      owner,
      messageBody,
      identifier,
    }: { id: string; owner: string; messageBody: string; identifier: string } =
      await req.json();
    const keypair = await KeypairModel.findOne({ _id: id, address: owner });

    console.log(keypair?.privateKey);

    if (!keypair) {
      return Response.json({
        success: false,
        message: "The keypair doesn't exist",
      });
    }

    const signature = await signMessage({
      privKey: keypair.privateKey,
      message: messageBody,
    });

    const msgHash = await getSignatureHash(signature);
    const message = new MessageModel({
      keypairId: id,
      identifier,
      signedMessage: msgHash,
    });

    keypair.lastUsed = new Date();
    await keypair.save();
    await message.save();

    return Response.json(
      { success: true, message: "Message hashed successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    console.log(err);
    return Response.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
