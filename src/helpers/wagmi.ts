import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bscTestnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: process.env.NEXT_PUBLIC_PROVIDER_ID!,
  chains: [bscTestnet],
  ssr: true,
});
