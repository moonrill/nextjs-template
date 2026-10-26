import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders switch variant with switch role and aria attributes", async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle variant="switch" />
      </ThemeProvider>
    );

    const toggleSwitch = await screen.findByRole("switch");
    expect(toggleSwitch).toBeInTheDocument();
    expect(toggleSwitch).toHaveAttribute("aria-checked", "false");
  });

  it("toggles theme and updates dark class on click in switch variant", async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle variant="switch" />
      </ThemeProvider>
    );

    const toggleSwitch = await screen.findByRole("switch");
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    act(() => {
      fireEvent.click(toggleSwitch);
    });

    expect(toggleSwitch).toHaveAttribute("aria-checked", "true");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    act(() => {
      fireEvent.click(toggleSwitch);
    });

    expect(toggleSwitch).toHaveAttribute("aria-checked", "false");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("renders button variant and toggles theme on click", async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle variant="button" />
      </ThemeProvider>
    );

    const toggleBtn = await screen.findByTestId("theme-toggle-button");
    expect(toggleBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(toggleBtn);
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(toggleBtn).toHaveAttribute("aria-label", "Beralih ke mode terang");
  });
});
