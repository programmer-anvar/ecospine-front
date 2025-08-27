import { ComponentProps, FC } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

type ThemeProviderProps = ComponentProps<typeof NextThemeProvider>;

export const ThemeProvider: FC<ThemeProviderProps> = props => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {props.children}
    </NextThemeProvider>
  );
};
