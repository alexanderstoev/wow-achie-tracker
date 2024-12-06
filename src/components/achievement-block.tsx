import { skipToken, useIsFetching } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { cva, type VariantProps } from "class-variance-authority";
import { SquarePlus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSettings } from "~/components/providers/settings-provider";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { isAchievementCompleted } from "~/lib/wat-utils";
import { api } from "~/trpc/react";

const achievementBlockVariants = cva(
  "border-none bg-gradient-to-r cursor-pointer",
  {
    variants: {
      variant: {
        default: "from-neutral-600 to-neutral-400 text-neutral-50",
        completed: "from-green-600 to-green-500 text-green-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface AchievementBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof achievementBlockVariants> {
  criteriaAchievement: CriteriaAchievement;
  indentLevel?: number;
}

export const AchievementBlock = ({
  criteriaAchievement,
  className,
  indentLevel,
  variant,
  ...props
}: AchievementBlockProps) => {
  //
  const [expanded, setExpanded] = useState(false);
  const [achievement, setAchievement] = useState<Achievement>();
  const { settings } = useSettings();

  // load achievement
  const achievementQuery = api.achievement.getAchievement.useQuery(
    expanded ? criteriaAchievement.id : skipToken,
  );
  const queryKey = getQueryKey(
    api.achievement.getAchievement,
    criteriaAchievement.id,
    "query",
  );
  const isFetching = useIsFetching({ queryKey });

  useEffect(() => {
    const fetchedData = achievementQuery.data as Achievement;
    if (achievementQuery.isSuccess) setAchievement(fetchedData);
  }, [achievementQuery.data, achievementQuery.isSuccess, isFetching]);

  return (
    <>
      <Card
        style={{ marginLeft: `${(indentLevel ?? 0) * 2}em` }}
        className={cn(achievementBlockVariants({ variant }), className)}
        {...props}
        onClick={() => setExpanded(!expanded)}
      >
        <CardHeader className="flex flex-row items-center justify-between p-0 px-4">
          <div className="flex items-center gap-2">
            <SquarePlus />
            <span>{criteriaAchievement?.name}</span>
          </div>
          <a
            href={`https://www.wowhead.com/achievement=${criteriaAchievement?.id}`}
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
        </CardHeader>
        {expanded && (
          <CardContent>
            <p>{achievement?.description}</p>

            {achievement?.criteria?.child_criteria?.map((criteria) => (
              <React.Fragment key={criteria.id}>
                {!criteria.achievement && !criteria.child_criteria && (
                  <p>{criteria.description}</p>
                )}
                {!criteria.achievement && criteria.child_criteria?.[0] && (
                  <p>{criteria.child_criteria[0]?.description}</p>
                )}
              </React.Fragment>
            ))}
          </CardContent>
        )}
      </Card>
      {expanded &&
        achievement?.criteria?.child_criteria?.map((criteria) => (
          <React.Fragment key={criteria.id}>
            {criteria.achievement && (
              <AchievementBlock
                indentLevel={(indentLevel ?? 0) + 1}
                variant={
                  isAchievementCompleted(criteria.achievement.id, settings)
                    ? "completed"
                    : "default"
                }
                criteriaAchievement={{
                  name: criteria.description,
                  id: criteria.achievement?.id ?? criteria.id,
                }}
              />
            )}
          </React.Fragment>
        ))}
    </>
  );
};
