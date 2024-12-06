import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { DarkModeSelect } from "~/components/dark-mode-select";
import { SettingsProvider } from "~/components/providers/settings-provider";

export const metadata: Metadata = {
  title: "WoW Achievement Tracker",
  description: "Track WoW achievement progress",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <SettingsProvider>
              <div>
                <DarkModeSelect />
              </div>
              {children}
            </SettingsProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
