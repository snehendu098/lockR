import { getKeypairsByAddress } from "@/helpers/db-functions";
import dbConnect from "@/lib/db-connect";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { address }: { address: string } = await req.json();
    console.log(address);

    const keys = await getKeypairsByAddress(address);

    if (!keys) {
      return Response.json(
        { success: false, message: "Key couldn't be accessed" },
        { status: 400 }
      );
    }

    return Response.json(
      { success: true, message: "Keys fetched successfully", data: keys },
      { status: 201 }
    );
  } catch (err: any) {
    console.log(err);
    return Response.json({ succes: false, message: err.message });
  }
}
