export const LOCAL_STORAGE_SETTINGS_ITEM = "wowAchiSettings";

export const loadSettings = (returnDefault?: boolean) => {
  const defaultSettings = {
    achievementId: 0,
    characterName: "",
    realmName: "",
    region: "EU",
  } as SettingsType;

  if (typeof window === "undefined" || returnDefault) {
    return defaultSettings;
  }

  const settingsStr = window.localStorage.getItem(LOCAL_STORAGE_SETTINGS_ITEM);
  if (!settingsStr) return defaultSettings;

  const settings = JSON.parse(settingsStr) as SettingsType;
  return settings;
};

export const saveSettings = (settings: SettingsType) => {
  const currentSettings = loadSettings();
  const newSettings = { ...currentSettings, ...settings };
  const settingsStr = JSON.stringify(newSettings);
  window.localStorage.setItem(LOCAL_STORAGE_SETTINGS_ITEM, settingsStr);
  return newSettings;
};

export const isAchievementCompleted = (
  achievementId: number,
  settings: SettingsType,
) => {
  const achiData = getEntryFromArray(
    achievementId,
    settings.characterAchievements?.achievements ?? [],
  );
  return !!achiData?.completed_timestamp;
};

export const isCriteriaCompleted = (
  achievementId: number,
  criteriaId: number,
  settings: SettingsType,
) => {
  const achiData = getEntryFromArray(
    achievementId,
    settings.characterAchievements?.achievements ?? [],
  );
  const critData = getEntryFromArray(
    criteriaId,
    achiData?.criteria.child_criteria ?? [],
  );
  return !!critData?.is_completed;
};

export const getEntryFromArray = <T extends { id: number }>(
  entryId: number,
  array: T[],
) => {
  return array.find((entry) => entry.id === entryId);
};
