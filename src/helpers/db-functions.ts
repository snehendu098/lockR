import KeypairModel from "@/models/keypair.model";

export async function getKeypairsByAddress(address: string) {
  const keypairs = await KeypairModel.find({ address });
  return keypairs;
}
