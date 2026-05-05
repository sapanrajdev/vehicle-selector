import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { QuickSelectButtons } from "./QuickSelectButtons";
import { QuickPreset } from "../../types";

const mockPresets: QuickPreset[] = [
  { label: "Preset 1", make: "make1", model: "model1", badge: "badge1" },
  { label: "Preset 2", make: "make2", model: "model2", badge: "badge2" },
];

const mockOnPresetSelect = jest.fn();

describe("QuickSelectButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with presets", () => {
    render(
      <QuickSelectButtons
        presets={mockPresets}
        onPresetSelect={mockOnPresetSelect}
      />,
    );

    expect(
      screen.getByText("Select a common vehicle quickly:"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Preset 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Preset 2" }),
    ).toBeInTheDocument();
  });

  it("calls onPresetSelect when a button is clicked", () => {
    render(
      <QuickSelectButtons
        presets={mockPresets}
        onPresetSelect={mockOnPresetSelect}
      />,
    );

    const button = screen.getByRole("button", { name: "Preset 1" });
    fireEvent.click(button);

    expect(mockOnPresetSelect).toHaveBeenCalledTimes(1);
    expect(mockOnPresetSelect).toHaveBeenCalledWith(mockPresets[0]);
  });

  it("renders multiple buttons correctly", () => {
    render(
      <QuickSelectButtons
        presets={mockPresets}
        onPresetSelect={mockOnPresetSelect}
      />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("handles empty presets array", () => {
    render(
      <QuickSelectButtons presets={[]} onPresetSelect={mockOnPresetSelect} />,
    );

    expect(
      screen.getByText("Select a common vehicle quickly:"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
