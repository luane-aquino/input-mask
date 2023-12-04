import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  test("should show input value with money format", () => {
    render(<App />);
    const inputElement = screen.getByRole("textbox", {
      name: /edit money/i,
    });
    userEvent.type(inputElement, "1000");
    expect(screen.getByDisplayValue("R$ 10,00")).toBeVisible();
  });

  test("should show input value with points format", () => {
    render(<App />);
    const inputElement = screen.getByRole("textbox", {
      name: /edit money/i,
    });
    const editPoints = screen.getByRole("radio", {
      name: /edit points/i,
    });
    userEvent.click(editPoints);
    userEvent.type(inputElement, "10");
    expect(screen.getByDisplayValue("10")).toBeVisible();
    expect(screen.getByText("pts")).toBeVisible();
  });

  test("should enable button only if input value is valid", () => {
    render(<App />);

    const confirmButton = screen.getByRole("button", { name: /confirmar/i });
    expect(confirmButton).toBeDisabled();
    const inputElement = screen.getByRole("textbox", {
      name: /edit money/i,
    });
    userEvent.type(inputElement, "1000");
    expect(screen.getByDisplayValue("R$ 10,00")).toBeVisible();
    expect(confirmButton).not.toBeDisabled();
  });
});
