import { render, screen } from "@testing-library/react";
import { StatusMessage } from "./StatusMessage";
import { StatusMessage as StatusMessageType } from "../../types";

describe("StatusMessage", () => {
  it("renders nothing when status is null", () => {
    const { container } = render(<StatusMessage status={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders success message correctly", () => {
    const status: StatusMessageType = {
      type: "success",
      message: "Success message",
    };
    render(<StatusMessage status={status} />);

    const messageElement = screen.getByText("Success message");
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass("status-message success");
  });

  it("renders error message correctly", () => {
    const status: StatusMessageType = {
      type: "error",
      message: "Error message",
    };
    render(<StatusMessage status={status} />);

    const messageElement = screen.getByText("Error message");
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass("status-message error");
  });

  it("renders with correct class for different types", () => {
    const successStatus: StatusMessageType = {
      type: "success",
      message: "Success",
    };
    const errorStatus: StatusMessageType = { type: "error", message: "Error" };

    const { rerender } = render(<StatusMessage status={successStatus} />);
    expect(screen.getByText("Success")).toHaveClass("success");

    rerender(<StatusMessage status={errorStatus} />);
    expect(screen.getByText("Error")).toHaveClass("error");
  });
});
