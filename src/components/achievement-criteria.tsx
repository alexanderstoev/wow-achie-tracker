import { cva, type VariantProps } from "class-variance-authority";
import { Check, X } from "lucide-react";
import React from "react";
import { cn } from "~/lib/utils";

const achievementCriteriaVariants = cva("flex items-center gap-2", {
  variants: {
    variant: {
      default: "text-neutral-400",
      completed: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AchievementCriteriaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof achievementCriteriaVariants> {
  caption: string;
}

export const AchievementCriteria = ({
  caption,
  className,
  variant,
  ...props
}: AchievementCriteriaProps) => {
  return (
    <div
      className={cn(achievementCriteriaVariants({ variant }), className)}
      {...props}
    >
      {variant == "completed" && (
        <Check className="text-green-600 drop-shadow-crit " strokeWidth={4}  size={16} />
      )}
      {variant == "default" && <X className="text-red-600 drop-shadow-crit" strokeWidth={4} size={16} />}
      {caption}
    </div>
  );
};
