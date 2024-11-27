import React from "react";

export type AchievementProps = {
  achievement?: Achievement;
};

export const Achievement = ({ achievement }: AchievementProps) => {
  return <div>achievement:{achievement?.name}</div>;
};
