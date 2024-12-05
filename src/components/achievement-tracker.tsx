"use client";

import { skipToken, useIsFetching } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useEffect, useState } from "react";
import { AchievementBlock } from "~/components/achievement-block";
import { AchievementSelect } from "~/components/achievement-select";
import { CharacterSelect } from "~/components/character-select";
import { loadSettings, saveSettings } from "~/lib/wat-utils";
import { api } from "~/trpc/react";

export const AchievementTracker = () => {
  //
  const [settings, setSettings] = useState(loadSettings(true));

  const handleUpdateSettings = (settings: SettingsType) => {
    const newSettings = saveSettings(settings);
    setSettings(newSettings);
  };

  // load settings from local storage
  useEffect(() => {
    const localSettings = loadSettings();
    setSettings(localSettings);
  }, []);

  // load achievement
  const achievementQuery = api.achievement.getAchievement.useQuery(
    !!settings.achievementId && !settings.achievement
      ? settings.achievementId
      : skipToken,
  );

  const queryKey = getQueryKey(
    api.achievement.getAchievement,
    settings.achievementId,
    "query",
  );
  const isFetching = useIsFetching({ queryKey });

  useEffect(() => {
    const fetchedData = achievementQuery.data as Achievement;
    if (achievementQuery.isSuccess)
      handleUpdateSettings({
        achievementId: fetchedData.id,
        achievement: {
          id: fetchedData.id,
          name: fetchedData.name ?? "",
        },
      });
  }, [achievementQuery.data, achievementQuery.isSuccess, isFetching]);

  return (
    <main className="m-auto flex w-full max-w-[1440px] flex-col items-stretch gap-6 px-12">
      <div className="flex items-center justify-start gap-2">
        Tracking
        <AchievementSelect
          settings={settings}
          updateSettings={(settings) => handleUpdateSettings(settings)}
        />
        for
        <CharacterSelect
          settings={settings}
          updateSettings={(settings) => handleUpdateSettings(settings)}
        />
      </div>
      {settings.achievement?.id && (
        <>
          <AchievementBlock criteriaAchievement={settings.achievement} />
        </>
      )}
    </main>
  );
};
