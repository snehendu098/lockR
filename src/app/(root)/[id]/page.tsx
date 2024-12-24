"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Editor from "@monaco-editor/react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/core/header";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useAccount } from "wagmi";
import { shortenHexString } from "@/helpers/cryptographic-functions";
import Exception from "@/components/core/exception-handler";

export default function LockR({ params }: any) {
  const [message, setMessage] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const account = useAccount();
  const [keyData, setKeyData] = useState<any>();

  const { id }: { id: string } = React.use(params);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/key/${id}`, {
        owner: account.address,
      });

      if (data.success) {
        setKeyData(data.data);
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error Occurred",
        description: "Error fetching documents related to key",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header>
          <></>
        </Header>

        {loading ? (
          <Exception>Loading</Exception>
        ) : (
          <>
            {/* Key Information */}
            <div className="space-y-4 mb-6">
              <div className="flex">
                <Badge className="bg-white hover:bg-white text-black shadow-md rounded-full">
                  key 1
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="font-mono">
                  Public Key:
                  <span className="bg-amber-200 px-2 py-1  rounded-md">
                    {shortenHexString(keyData.publicKey.x, keyData.publicKey.y)}
                  </span>
                </p>
                <div className="flex items-center space-x-2">
                  <p className="font-mono ">
                    Private Key:{" "}
                    <span className="bg-amber-200 px-2 py-1  rounded-md">
                      {showPrivateKey
                        ? "48uhruhe8494huhhhhue90j"
                        : "48•••••••e90j"}
                    </span>
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                    className="h-8 w-8 p-0 hover:bg-white/50"
                  >
                    {showPrivateKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPrivateKey ? "Hide" : "Show"} private key
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="sign" className="w-full">
              <TabsList className="w-full grid grid-cols-2 p-1">
                <TabsTrigger
                  value="sign"
                  className="data-[state=active]:bg-amber-900 data-[state=active]:text-white transition-colors rounded-md"
                >
                  Sign Message
                </TabsTrigger>
                <TabsTrigger
                  value="view"
                  className="data-[state=active]:bg-amber-900 data-[state=active]:text-white transition-colors rounded-md"
                >
                  View Signed Messages
                </TabsTrigger>
              </TabsList>
              <TabsContent value="sign" className="mt-4">
                <Label className="text-lg">Vote Identifier</Label>
                <Input
                  className="mb-2 bg-white border-0 shadow-lg"
                  placeholder="Vote 1"
                />
                <Label className="text-lg">Message Body</Label>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Editor
                    height="400px"
                    defaultLanguage="json"
                    theme="vs-dark"
                    value={message}
                    onChange={(value) => setMessage(value || "")}
                    options={{
                      minimap: { enabled: false },
                      lineNumbers: "on",
                      roundedSelection: true,
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                    }}
                  />
                </div>
                <Button className="mt-4">Sign Message</Button>
              </TabsContent>
              <TabsContent value="view" className="mt-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-500">No signed messages yet</p>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </>
  );
}
