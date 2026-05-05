import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the VehicleSelectionForm", () => {
    render(<App />);

    expect(screen.getByText("Vehicle Selection Form")).toBeInTheDocument();
  });
});
