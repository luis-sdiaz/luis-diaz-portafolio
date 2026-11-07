"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const themeScriptProps =
  typeof window === "undefined"
    ? undefined
    : { type: "application/json" as const };

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props} scriptProps={themeScriptProps}>
      {children}
    </NextThemesProvider>
  );
}

export default ThemeProvider;
