import React, { useState, useEffect } from "react";

const defaultLightTheme = {
  backgroundColor: "#ffffff",
  textColor: "#1a1a1a",
  accentColor: "#0066cc",
};

const defaultDarkTheme = {
  backgroundColor: "#1a1a1a",
  textColor: "#ffffff",
  accentColor: "#66b3ff",
};

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [customColors, setCustomColors] = useState({
    backgroundColor: "",
    textColor: "",
    accentColor: "",
  });

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme-preferences");
      if (savedTheme) {
        const { isDark, custom } = JSON.parse(savedTheme);
        setIsDarkMode(isDark);
        setCustomColors(custom);
      }
    } catch (error) {
      console.error("Error loading theme preferences:", error);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = isDarkMode ? defaultDarkTheme : defaultLightTheme;
    const activeColors = {
      backgroundColor:
        customColors.backgroundColor || currentTheme.backgroundColor,
      textColor: customColors.textColor || currentTheme.textColor,
      accentColor: customColors.accentColor || currentTheme.accentColor,
    };

    root.style.setProperty("--bg-color", activeColors.backgroundColor);
    root.style.setProperty("--text-color", activeColors.textColor);
    root.style.setProperty("--accent-color", activeColors.accentColor);

    try {
      localStorage.setItem(
        "theme-preferences",
        JSON.stringify({
          isDark: isDarkMode,
          custom: customColors,
        })
      );
    } catch (error) {
      console.error("Error saving theme preferences:", error);
    }
  }, [isDarkMode, customColors]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleColorChange = (colorType, value) => {
    setCustomColors((prev) => ({
      ...prev,
      [colorType]: value,
    }));
  };

  const resetColors = () => {
    setCustomColors({
      backgroundColor: "",
      textColor: "",
      accentColor: "",
    });
  };

  return (
    <div
      className="p-6 transition-all duration-300 ease-in-out"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">Dark Mode</span>
        </label>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold m-0">Customize Theme</h3>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="flex items-center justify-between">
                <span className="text-sm">Background Color:</span>
                <input
                  type="color"
                  value={
                    customColors.backgroundColor ||
                    (isDarkMode
                      ? defaultDarkTheme.backgroundColor
                      : defaultLightTheme.backgroundColor)
                  }
                  onChange={(e) =>
                    handleColorChange("backgroundColor", e.target.value)
                  }
                  className="w-12 h-8 rounded cursor-pointer"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center justify-between">
                <span className="text-sm">Text Color:</span>
                <input
                  type="color"
                  value={
                    customColors.textColor ||
                    (isDarkMode
                      ? defaultDarkTheme.textColor
                      : defaultLightTheme.textColor)
                  }
                  onChange={(e) =>
                    handleColorChange("textColor", e.target.value)
                  }
                  className="w-12 h-8 rounded cursor-pointer"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center justify-between">
                <span className="text-sm">Accent Color:</span>
                <input
                  type="color"
                  value={
                    customColors.accentColor ||
                    (isDarkMode
                      ? defaultDarkTheme.accentColor
                      : defaultLightTheme.accentColor)
                  }
                  onChange={(e) =>
                    handleColorChange("accentColor", e.target.value)
                  }
                  className="w-12 h-8 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          <button
            onClick={resetColors}
            className="px-4 py-2 rounded text-sm font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: "var(--accent-color)",
              color: "var(--bg-color)",
            }}
          >
            Reset to Default Colors
          </button>
        </div>
      </div>

      <div
        className="mt-6 p-4 rounded border transition-all duration-300 ease-in-out"
        style={{
          borderColor: "var(--accent-color)",
        }}
      >
        <h2 className="text-xl font-bold mb-4">Theme Preview</h2>
        <p className="mb-4">
          This is the text
        </p>
        <a
          href="#"
          className="transition-colors duration-200 ease-in-out hover:opacity-80"
          style={{
            color: "var(--accent-color)",
          }}
        >
          This is Link
        </a>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
