import { render, screen, fireEvent } from "@testing-library/react";
import { VehicleForm } from "./VehicleForm";

const defaultProps = {
  loading: false,
  make: "",
  model: "",
  badge: "",
  makeOptions: ["ford", "bmw", "tesla"],
  modelOptions: [],
  badgeOptions: [],
  fileInputRef: { current: null },
  onMakeChange: jest.fn(),
  onModelChange: jest.fn(),
  onBadgeChange: jest.fn(),
  onFileChange: jest.fn(),
  onSubmit: jest.fn(),
};

describe("VehicleForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form elements", () => {
    render(<VehicleForm {...defaultProps} />);

    expect(screen.getByLabelText("Make")).toBeInTheDocument();
    expect(screen.getByLabelText("Model")).toBeInTheDocument();
    expect(screen.getByLabelText("Badge")).toBeInTheDocument();
    expect(screen.getByLabelText("Logbook file")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Submit vehicle selection" }),
    ).toBeInTheDocument();
  });

  it("renders make options correctly", () => {
    render(<VehicleForm {...defaultProps} />);

    const makeSelect = screen.getByLabelText("Make");
    expect(makeSelect).toHaveValue("");
    expect(screen.getByText("Choose make")).toBeInTheDocument();
    expect(screen.getByText("Ford")).toBeInTheDocument();
    expect(screen.getByText("Bmw")).toBeInTheDocument();
    expect(screen.getByText("Tesla")).toBeInTheDocument();
  });

  it("calls onMakeChange when make is selected", () => {
    render(<VehicleForm {...defaultProps} />);

    const makeSelect = screen.getByLabelText("Make");
    fireEvent.change(makeSelect, { target: { value: "ford" } });

    expect(defaultProps.onMakeChange).toHaveBeenCalledWith("ford");
  });

  it("disables model select when no make is selected", () => {
    render(<VehicleForm {...defaultProps} />);

    const modelSelect = screen.getByLabelText("Model");
    expect(modelSelect).toBeDisabled();
  });

  it("enables model select when make is selected", () => {
    render(
      <VehicleForm
        {...defaultProps}
        make="ford"
        modelOptions={["Ranger", "Falcon"]}
      />,
    );

    const modelSelect = screen.getByLabelText("Model");
    expect(modelSelect).not.toBeDisabled();
  });

  it("renders model options when make is selected", () => {
    render(
      <VehicleForm
        {...defaultProps}
        make="ford"
        modelOptions={["Ranger", "Falcon"]}
      />,
    );

    expect(screen.getByText("Ranger")).toBeInTheDocument();
    expect(screen.getByText("Falcon")).toBeInTheDocument();
  });

  it("calls onModelChange when model is selected", () => {
    render(
      <VehicleForm
        {...defaultProps}
        make="ford"
        modelOptions={["Ranger", "Falcon"]}
      />,
    );

    const modelSelect = screen.getByLabelText("Model");
    fireEvent.change(modelSelect, { target: { value: "Ranger" } });

    expect(defaultProps.onModelChange).toHaveBeenCalledWith("Ranger");
  });

  it("disables badge select when no model is selected", () => {
    render(<VehicleForm {...defaultProps} make="ford" />);

    const badgeSelect = screen.getByLabelText("Badge");
    expect(badgeSelect).toBeDisabled();
  });

  it("enables badge select when model is selected", () => {
    render(
      <VehicleForm
        {...defaultProps}
        make="ford"
        model="Ranger"
        badgeOptions={["Raptor", "Wildtrak"]}
      />,
    );

    const badgeSelect = screen.getByLabelText("Badge");
    expect(badgeSelect).not.toBeDisabled();
  });

  it("renders badge options when model is selected", () => {
    render(
      <VehicleForm
        {...defaultProps}
        make="ford"
        model="Ranger"
        badgeOptions={["Raptor", "Wildtrak"]}
      />,
    );

    expect(screen.getByText("Raptor")).toBeInTheDocument();
    expect(screen.getByText("Wildtrak")).toBeInTheDocument();
  });

  it("calls onBadgeChange when badge is selected", () => {
    render(
      <VehicleForm
        {...defaultProps}
        make="ford"
        model="Ranger"
        badgeOptions={["Raptor", "Wildtrak"]}
      />,
    );

    const badgeSelect = screen.getByLabelText("Badge");
    fireEvent.change(badgeSelect, { target: { value: "Raptor" } });

    expect(defaultProps.onBadgeChange).toHaveBeenCalledWith("Raptor");
  });

  it("disables file input when no badge is selected", () => {
    render(<VehicleForm {...defaultProps} make="ford" model="Ranger" />);

    const fileInput = screen.getByLabelText("Logbook file");
    expect(fileInput).toBeDisabled();
  });

  it("enables file input when badge is selected", () => {
    render(
      <VehicleForm
        {...defaultProps}
        make="ford"
        model="Ranger"
        badge="Raptor"
      />,
    );

    const fileInput = screen.getByLabelText("Logbook file");
    expect(fileInput).not.toBeDisabled();
  });

  it("calls onFileChange when file is selected", () => {
    render(
      <VehicleForm
        {...defaultProps}
        make="ford"
        model="Ranger"
        badge="Raptor"
      />,
    );

    const file = new File(["logbook content"], "logbook.txt", {
      type: "text/plain",
    });
    const fileInput = screen.getByLabelText("Logbook file");

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(defaultProps.onFileChange).toHaveBeenCalledWith(file);
  });

  it("calls onSubmit when form is submitted", () => {
    render(<VehicleForm {...defaultProps} />);

    const form = document.querySelector("form");
    fireEvent.submit(form!);

    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables submit button when loading", () => {
    render(<VehicleForm {...defaultProps} loading={true} />);

    const button = screen.getByRole("button", { name: "Submitting..." });
    expect(button).toBeDisabled();
  });

  it("shows loading text when loading", () => {
    render(<VehicleForm {...defaultProps} loading={true} />);

    expect(screen.getByText("Submitting...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("submit-button");
  });

  it("shows normal text when not loading", () => {
    render(<VehicleForm {...defaultProps} />);

    expect(screen.getByText("Submit vehicle selection")).toBeInTheDocument();
  });

  it("sets correct accept attribute on file input", () => {
    render(
      <VehicleForm
        {...defaultProps}
        make="ford"
        model="Ranger"
        badge="Raptor"
      />,
    );

    const fileInput = screen.getByLabelText("Logbook file");
    expect(fileInput).toHaveAttribute("accept", ".txt,text/plain");
  });

  it("sets title on disabled file input", () => {
    render(<VehicleForm {...defaultProps} />);

    const fileInput = screen.getByLabelText("Logbook file");
    expect(fileInput).toHaveAttribute("title", "Please select a badge first");
  });
});
