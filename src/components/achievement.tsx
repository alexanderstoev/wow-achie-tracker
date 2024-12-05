import { cva, type VariantProps } from "class-variance-authority";
import { SquarePlus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

export interface AchievementProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof achievementVariants> {
  asChild?: boolean;
  achievement?: Achievement;
}

const achievementVariants = cva(
  "border-none bg-gradient-to-r from-green-500 to-green-200 text-green-50",
  {
    variants: {
      variant: {
        default: "from-neutral-500 to-neutral-200 text-neutral-50",
        completed: "from-green-500 to-green-200 text-green-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const Achievement = ({
  achievement,
  variant,
  className,
}: AchievementProps) => {
  console.log(achievement?.criteria);
  const [cardExpanded, setCardExpanded] = useState(false);
  return (
    <Card className={cn(achievementVariants({ variant, className }))}>
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
          <p className={`reward ${variant === "completed" ? "completed" : ""}`}>
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
      {cardExpanded && <CardContent>{achievement?.description}</CardContent>}
    </Card>
  );
};
