"use client";

import { useEffect, useState } from "react";
import { Achievement } from "~/components/achievement";
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

  useEffect(() => {
    const localSettings = loadSettings();
    setSettings(localSettings);
  }, []);

  // load achievement
  const achievementQuery = api.achievement.getAchievement.useQuery(
    settings.achievementId ?? 0,
    { enabled: false },
  );
  useEffect(() => {
    void achievementQuery.refetch();
  }, [achievementQuery, settings.achievementId]);
  useEffect(() => {
    if (achievementQuery.data)
      handleUpdateSettings({
        achievement: achievementQuery.data as Achievement,
      });
  }, [achievementQuery.data, achievementQuery.isSuccess]);

  return (
    <main className="flex w-full flex-col items-stretch gap-6 p-12">
      <CharacterSelect
        settings={settings}
        updateSettings={(settings) => handleUpdateSettings(settings)}
      />
      <AchievementSelect
        settings={settings}
        updateSettings={(settings) => handleUpdateSettings(settings)}
      />
      {settings.achievement?.id && (
        <>
          <Achievement achievement={settings.achievement} />
          <Achievement achievement={settings.achievement} variant="completed" />
        </>
      )}
    </main>
  );
};
