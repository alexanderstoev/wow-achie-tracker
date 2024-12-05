import { SquarePlus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

export type AchievementProps = {
  achievement?: Achievement;
};

export const Achievement = ({ achievement }: AchievementProps) => {
  const [cardExpanded, setCardExpanded] = useState(false);
  return (
    <Card className="border-none bg-gradient-to-r from-green-500 to-green-200 text-green-50">
      <CardHeader
        className="flex w-full flex-row items-center gap-6 p-4"
        onClick={() => setCardExpanded(!cardExpanded)}
      >
        <p className="">
          <SquarePlus />
        </p>
        <p className="flex-grow text-2xl font-bold">{achievement?.name}</p>
        <p className="">
          <a
            href={`https://www.wowhead.com/achievement=${achievement?.id}`}
            target="_blank"
            className="flex items-center gap-1"
            title="View on Wowhead"
          >
            <Image
              src="/wow-head.png"
              alt="View on Wowhead"
              width={48}
              height={48}
            />
          </a>
        </p>
      </CardHeader>

      {!cardExpanded && (
        <CardFooter className="h-0 items-end justify-center p-1 pb-0">
          <p className="reward">
            <a
              href={`https://www.wowhead.com/item=${achievement?.reward_item?.id}`}
              target="_blank"
              className="flex items-center gap-1"
              title="View on Wowhead"
            >
              {achievement?.reward_description}
            </a>
          </p>
        </CardFooter>
      )}
      {cardExpanded && <CardContent>ala bala</CardContent>}
    </Card>
  );
};
