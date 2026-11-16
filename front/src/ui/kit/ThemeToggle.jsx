import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons.jsx";

const STORAGE_KEY = "mfg-theme";

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function systemPrefersDark() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

/**
 * ThemeToggle — ручное переключение светлой/тёмной темы (PROMPT.md, п.5):
 * все цвета — токены (index.css), переключение не оставляет «грязи» и
 * контрастных провалов, потому что каждый экран читает только переменные.
 * Состояние хранится в localStorage и уважает системную настройку по умолчанию.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState(() => getStoredTheme() || (systemPrefersDark() ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* приватный режим браузера — переключение всё равно работает в рамках сессии */
    }
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="btn btn-plate icon-btn"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      title={isDark ? "Светлая тема" : "Тёмная тема"}
    >
      {isDark ? <MoonIcon size={18} /> : <SunIcon size={18} />}
    </button>
  );
}

export default ThemeToggle;
