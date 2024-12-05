"use client";

import { skipToken } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AchievementBlock } from "~/components/achievement-block";
import { AchievementSelect } from "~/components/achievement-select";
import { CharacterSelect } from "~/components/character-select";
import { loadSettings, saveSettings } from "~/lib/wat-utils";
import { api } from "~/trpc/react";

export const AchievementTracker = () => {
  // handle settings
  const defaultSettings = {
    achievementId: 0,
    characterName: "",
    realmName: "",
    region: "EU",
  } as SettingsType;

  const [settings, setSettings] = useState(defaultSettings);

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
    !!settings.achievementId ? settings.achievementId : skipToken,
  );

  useEffect(() => {
    const fetchedData = achievementQuery.data as Achievement;
    if (achievementQuery.isSuccess)
      handleUpdateSettings({
        achievementId: fetchedData.id,
        achievement: fetchedData,
      });
  }, [achievementQuery.data, achievementQuery.isSuccess]);

  return (
    <main className="flex w-full flex-col items-stretch gap-6 px-12">
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
          <Achievement achievement={settings.achievement} />
          <Achievement achievement={settings.achievement} variant="completed" />
        </>
      )}
    </main>
  );
};
