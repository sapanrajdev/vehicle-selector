import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import VehicleSelectionForm from "./VehicleSelectionForm";
import { useVehicleForm } from "../../hooks/useVehicleForm";
import { submitVehicleForm } from "../../services/apiService";

// 1. Mock Dependencies
jest.mock("../../hooks/useVehicleForm");
jest.mock("../../services/apiService");

// 2. Mock DOM methods not implemented in JSDOM
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("VehicleSelectionForm Component", () => {
  const mockUpdateMake = jest.fn();
  const mockUpdateModel = jest.fn();
  const mockUpdateBadge = jest.fn();
  const mockUpdateFile = jest.fn();
  const mockSetPreset = jest.fn();
  const mockValidateForm = jest.fn();

  const mockHookReturn = {
    make: "",
    model: "",
    badge: "",
    makeOptions: ["Toyota", "Tesla"],
    modelOptions: ["Camry", "Model 3"],
    badgeOptions: ["LE", "Performance"],
    file: new File([""], "test.jpg", { type: "image/jpeg" }),
    fileInputRef: { current: null },
    updateMake: mockUpdateMake,
    updateModel: mockUpdateModel,
    updateBadge: mockUpdateBadge,
    updateFile: mockUpdateFile,
    setPreset: mockSetPreset,
    validateForm: mockValidateForm,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useVehicleForm as jest.Mock).mockReturnValue(mockHookReturn);
  });

  test("renders the form with initial title and components", () => {
    render(<VehicleSelectionForm />);
    expect(screen.getByText(/Vehicle Selection Form/i)).toBeInTheDocument();
  });

  test("calls setPreset when a quick select button is clicked", () => {
    render(<VehicleSelectionForm />);
    const presetBtn = screen.getByText(/Tesla/i);
    fireEvent.click(presetBtn);
    expect(mockSetPreset).toHaveBeenCalled();
  });

  test("shows error message if form validation fails", async () => {
    mockValidateForm.mockReturnValue("Make");
    render(<VehicleSelectionForm />);

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/Please select Make/i)).toBeInTheDocument();
    expect(submitVehicleForm).not.toHaveBeenCalled();
  });

  test("submits form and displays success message on successful API call", async () => {
    mockValidateForm.mockReturnValue(null);
    (submitVehicleForm as jest.Mock).mockResolvedValue({
      success: true,
      message: "Vehicle submitted successfully!",
      // MATCHING YOUR COMPONENT'S EXPECTED STRUCTURE:
      data: {
        vehicle: {
          make: "Toyota",
          model: "Camry",
          badge: "LE",
        },
      },
    });

    render(<VehicleSelectionForm />);

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitBtn);

    // Using a function matcher to find text even if broken by tags
    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.includes("Vehicle submitted successfully!"),
        ),
      ).toBeInTheDocument();
    });

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  test("handles API errors and displays error message", async () => {
    mockValidateForm.mockReturnValue(null);
    const errorMessage = "Server error occurred";
    (submitVehicleForm as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(<VehicleSelectionForm />);

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  test("clears status when inputs change (fireEvent MUI fix)", async () => {
    render(<VehicleSelectionForm />);

    // 1. Target the MUI Select (which is a div with role="combobox")
    const makeSelect = screen.getByRole("combobox", { name: /make/i });

    // 2. MUI Select often triggers on mouseDown rather than click in test envs
    fireEvent.mouseDown(makeSelect);

    // 3. Find the listbox that appears in the portal
    // We use findBy because the portal takes a tick to render
    const listbox = await screen.findByRole("listbox");

    // 4. Find the option inside the listbox and click it
    const option = within(listbox).getByText("Toyota");
    fireEvent.click(option);

    // 5. Verify the mock hook was called
    expect(mockUpdateMake).toHaveBeenCalledWith("Toyota");
  });

  test("sets loading state during submission", async () => {
    mockValidateForm.mockReturnValue(null);
    (submitVehicleForm as jest.Mock).mockReturnValue(
      new Promise((resolve) =>
        setTimeout(
          () => resolve({ success: true, data: { vehicle: {} } }),
          100,
        ),
      ),
    );

    render(<VehicleSelectionForm />);

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitBtn);

    // Assert that the button is disabled during the "loading" phase
    expect(submitBtn).toBeDisabled();
  });
});
