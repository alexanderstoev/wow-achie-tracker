"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Switch } from "~/components/ui/switch";

export const DarkModeSelect = () => {
  const { setTheme, theme } = useTheme();
  const [switchCheked, setSwitchChecked] = useState(false);
  useEffect(() => {
    setSwitchChecked(theme === "dark");
  }, [theme]);
  return (
    <div className="flex items-center gap-2 bg-muted p-4 dark:bg-transparent">
      <Switch
        checked={switchCheked}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />{" "}
      Dark mode
    </div>
  );
};
