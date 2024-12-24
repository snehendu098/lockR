"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Key, Loader2, PlusIcon } from "lucide-react";
import Header from "@/components/core/header";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import Exception from "@/components/core/exception-handler";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { IKeypairDocument } from "@/models/keypair.model";
import { shortenHexString } from "@/helpers/cryptographic-functions";
import Link from "next/link";

export default function Home() {
  const [keys, setKeys] = useState<IKeypairDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");

  const account = useAccount();
  const router = useRouter();

  const fetchKeys = async () => {
    setLoading(true);
    try {
      if (account.address) {
        const { data } = await axios.post("/api/key/", {
          address: account.address,
        });

        if (data.success) {
          setKeys(data.data);
        }
      }
    } catch (err: any) {
      console.log(err);
      toast({
        title: "Error",
        description: "Couldn't fetch your keys, kindly refresh",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDialogBtn = async () => {
    try {
      setLoading(true);
      if (account.address) {
        const { data } = await axios.post("/api/key/create", {
          address: account.address,
          label,
        });

        if (data.success) {
          toast({
            title: "Created",
            description: `Key created successfully with label ${label}`,
          });

          fetchKeys();
        } else {
          toast({ title: "Failed", description: `Key creation failed` });
        }
      }
    } catch (err: any) {
      console.log(err);
      toast({
        title: "Error",
        description: "Couldn't create a new key",
      });
    } finally {
      setDialogOpen(false);
      setLabel("");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Header>
          <Dialog
            onOpenChange={() => setDialogOpen(!dialogOpen)}
            open={dialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                onClick={() => setDialogOpen(true)}
                className="flex items-center"
              >
                <PlusIcon />
                New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] font-mono">
              <DialogHeader>
                <DialogTitle>Create key</DialogTitle>
                <DialogDescription>
                  Create a new key for your custom label
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name">Label</Label>
                  <Input
                    id="name"
                    placeholder="key-1"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="col-span-4"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={loading && dialogOpen}
                  onClick={handleDialogBtn}
                >
                  {loading && dialogOpen ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Header>

        {loading && !dialogOpen ? (
          <Exception>Loading your connected keys</Exception>
        ) : (
          <>
            {keys.length > 0 ? (
              <div className="grid grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keys.map((item: IKeypairDocument, idx) => (
                  <Link key={idx} href={`/${item._id}`}>
                    <Card
                      onClick={async () => {
                        console.log(item);
                      }}
                      className="bg-amber-50 relative cursor-pointer group shadow-md p-4 border-0 hover:-translate-y-1 transition duration-300 hover:bg-white hover:shadow-xl"
                    >
                      <Key className="text-amber-700/50 absolute top-4 right-4 group-hover:text-amber-700/90 duration-300" />
                      <div className="flex pt-8 flex-col space-y-2">
                        <div className="font-mono text-lg">
                          {shortenHexString(
                            item.publicKey?.x,
                            item.publicKey?.y
                          ) || ""}
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge
                            variant="outline"
                            className="bg-yellow-400 border-0 rounded-full shadow-md font-mono text-xs"
                          >
                            {item.label}
                          </Badge>
                          {/* <span className="text-gray-600 text-sm font-mono">
                        Votes: 
                      </span> */}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Exception>Create a New Key to get started</Exception>
            )}
          </>
        )}
      </div>
    </>
  );
}
