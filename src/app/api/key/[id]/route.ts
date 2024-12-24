import dbConnect from "@/lib/db-connect";
import KeypairModel from "@/models/keypair.model";
import mongoose from "mongoose";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await dbConnect();
    const { id } = await params;

    const data = await KeypairModel.aggregate([
      // Match the specific keypair
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },

      // Lookup messages for this keypair
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "keypairId",
          as: "signedMessages",
          pipeline: [
            {
              $sort: {
                timestamp: -1,
              },
            },
            {
              $project: {
                _id: 1,
                signedMessage: 1,
                identifier: 1,
                timestamp: 1,
                createdAt: 1,
              },
            },
          ],
        },
      },

      // Project final shape of the data
      {
        $project: {
          _id: 1,
          publicKey: 1,
          privateKey: 1,
          label: 1,
          status: 1,
          address: 1,
          lastUsed: 1,
          signedMessages: 1,
          messageCount: { $size: "$signedMessages" },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    if (!data || data.length === 0) {
      return Response.json(
        { success: false, message: "Keypair not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: data[0] }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return Response.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
};
