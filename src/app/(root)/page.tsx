import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Key, PlusIcon } from "lucide-react";
import Header from "@/components/core/header";

export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Header>
          <Button>
            <PlusIcon className="font-bold" /> New
          </Button>
        </Header>

        <div className="grid grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Card
              key={item}
              className="bg-amber-50 relative cursor-pointer group shadow-md p-4 border-0 hover:-translate-y-1 transition duration-300 hover:bg-white hover:shadow-xl"
            >
              <Key className="text-amber-700/50 absolute top-4 right-4 group-hover:text-amber-700/90 duration-300" />
              <div className="flex pt-8 flex-col space-y-2">
                <div className="font-mono text-lg">k27dy.........37sj</div>
                <div className="flex justify-between items-center">
                  <Badge
                    variant="outline"
                    className="bg-yellow-400 border-0 rounded-full shadow-md font-mono text-xs"
                  >
                    key 1
                  </Badge>
                  <span className="text-gray-600 text-sm font-mono">
                    Votes: 12
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
