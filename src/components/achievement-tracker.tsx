"use client";

import { skipToken, useIsFetching } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useEffect } from "react";
import { AchievementBlock } from "~/components/achievement-block";
import { AchievementSelect } from "~/components/achievement-select";
import { CharacterSelect } from "~/components/character-select";
import { useSettings } from "~/components/providers/settings-provider";
import { isAchievementCompleted } from "~/lib/wat-utils";
import { api } from "~/trpc/react";

export const AchievementTracker = () => {
  //

  const { settings, updateSettings } = useSettings();

  // load achievement
  const achievementQuery = api.achievement.getAchievement.useQuery(
    !!settings.achievementId && !settings.achievement
      ? settings.achievementId
      : skipToken,
  );

  const queryKeyAchievement = getQueryKey(
    api.achievement.getAchievement,
    settings.achievementId,
    "query",
  );
  const isFetchingAchievement = useIsFetching({
    queryKey: queryKeyAchievement,
  });

  useEffect(() => {
    const fetchedData = achievementQuery.data! as Achievement;
    if (achievementQuery.isSuccess)
      updateSettings({
        achievementId: fetchedData.id,
        achievement: {
          id: fetchedData.id,
          name: fetchedData.name ?? "",
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    achievementQuery.data,
    achievementQuery.isSuccess,
    isFetchingAchievement,
    // updateSettings,
  ]);

  // load character data
  const characterQuery = api.achievement.getCharacterAchievements.useQuery(
    !!settings.characterName && !!settings.realmName && !!settings.region // only trigger the query if we have all the data in the settings
      ? {
          character: settings.characterName,
          realm: settings.realmName,
          region: settings.region,
        }
      : skipToken,
  );

  const queryKeyCharacter = getQueryKey(
    api.achievement.getCharacterAchievements,
    {
      character: settings.characterName,
      realm: settings.realmName,
      region: settings.region,
    },
    "query",
  );
  const isFetchingCharacter = useIsFetching({
    queryKey: queryKeyCharacter,
  });

  useEffect(() => {
    const fetchedData = characterQuery.data!;
    if (characterQuery.isSuccess) {
      updateSettings({ characterAchievements: fetchedData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    characterQuery.data,
    characterQuery.isSuccess,
    isFetchingCharacter,
    //   updateSettings,
  ]);

  return (
    <main className="m-auto flex w-full max-w-[1440px] flex-col items-stretch gap-6 px-12">
      <div className="flex items-center justify-start gap-2">
        Tracking
        <AchievementSelect
          settings={settings}
          updateSettings={(settings) => updateSettings(settings)}
        />
        for
        <CharacterSelect
          settings={settings}
          updateSettings={(settings) => updateSettings(settings)}
        />
      </div>
      {settings.achievement?.id && (
        <>
          <AchievementBlock
            criteriaAchievement={settings.achievement}
            variant={
              isAchievementCompleted(settings.achievementId ?? 0, settings)
                ? "completed"
                : "default"
            }
          />
        </>
      )}
    </main>
  );
};
