"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { loadSettings, saveSettings } from "~/lib/wat-utils";

interface SettingsProviderProps {
  settings: SettingsType;
  updateSettings: (settings: SettingsType) => void;
}

const SettingsContext = createContext<SettingsProviderProps | undefined>(
  undefined,
);

export const useSettings = (): SettingsProviderProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  //
  const [settings, setSettings] = useState<SettingsType>(loadSettings(true));
  const handleUpdateSettings = (settings: SettingsType) => {
    const newSettings = saveSettings(settings);
    setSettings(newSettings);
  };

  // load settings from local storage
  useEffect(() => {
    const localSettings = loadSettings();
    setSettings(localSettings);
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settings: settings, updateSettings: handleUpdateSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
