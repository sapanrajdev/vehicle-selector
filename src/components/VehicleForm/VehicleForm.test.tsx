import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { VehicleForm } from "./VehicleForm";

describe("VehicleForm", () => {
  const mockProps = {
    loading: false,
    make: "",
    model: "",
    badge: "",
    makeOptions: ["Toyota", "Mazda"],
    modelOptions: ["Corolla", "CX-5"],
    badgeOptions: ["Standard", "Highline"],
    fileInputRef: React.createRef<HTMLInputElement>(),
    onMakeChange: jest.fn(),
    onModelChange: jest.fn(),
    onBadgeChange: jest.fn(),
    onFileChange: jest.fn(),
    onSubmit: jest.fn((e) => e.preventDefault()),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form title and all initial fields", () => {
    render(<VehicleForm {...mockProps} />);
    expect(screen.getByText("Vehicle Selection")).toBeInTheDocument();
  });

  it("disables Model and Badge dropdowns when no Make is selected", () => {
    render(<VehicleForm {...mockProps} />);
    const modelSelect = screen
      .getByLabelText(/Model/i)
      .closest(".MuiInputBase-root");
    expect(modelSelect).toHaveClass("Mui-disabled");
  });

  it("calls onMakeChange when a make is selected", () => {
    render(<VehicleForm {...mockProps} />);
    const makeSelect = screen.getByLabelText(/Make/i);
    fireEvent.mouseDown(makeSelect);

    const option = screen.getByRole("option", { name: /Toyota/i });
    fireEvent.click(option);

    expect(mockProps.onMakeChange).toHaveBeenCalledWith("Toyota");
  });

  it("shows loading spinner when loading is true", () => {
    render(<VehicleForm {...mockProps} loading={true} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText(/Submitting.../i)).toBeInTheDocument();
  });
});
