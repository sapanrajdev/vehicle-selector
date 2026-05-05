import { render, screen } from "@testing-library/react";
import { SubmissionResult } from "./SubmissionResult";
import { SubmissionResponse } from "../../types";

const mockResponseData: SubmissionResponse = {
  vehicle: {
    make: "Tesla",
    model: "Model 3",
    badge: "Performance",
  },
  logbook: "Sample logbook content\nLine 2",
};

describe("SubmissionResult", () => {
  it("renders nothing when responseData is null", () => {
    const { container } = render(<SubmissionResult responseData={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders submission result correctly", () => {
    render(<SubmissionResult responseData={mockResponseData} />);

    expect(screen.getByText("Submission result")).toBeInTheDocument();
    expect(screen.getByText("Make:")).toBeInTheDocument();
    expect(screen.getByText("Tesla")).toBeInTheDocument();
    expect(screen.getByText("Model:")).toBeInTheDocument();
    expect(screen.getByText("Model 3")).toBeInTheDocument();
    expect(screen.getByText("Badge:")).toBeInTheDocument();
    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("Logbook contents:")).toBeInTheDocument();
    expect(screen.getByText(/Sample logbook content/)).toBeInTheDocument();
  });

  it("renders logbook content in pre tag", () => {
    render(<SubmissionResult responseData={mockResponseData} />);

    const preElement = screen.getByText(/Sample logbook content/);
    expect(preElement.tagName).toBe("PRE");
  });

  it("renders with correct structure", () => {
    render(<SubmissionResult responseData={mockResponseData} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Submission result" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/:/)).toHaveLength(4); // Make:, Model:, Badge:, Logbook contents:
  });
});
