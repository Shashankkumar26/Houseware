// header.test.jsx
import React from "react";
import { render, screen,waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect"; // for extended jest-dom matchers
import { Header } from "../todo/components/header"

// Mock the dispatch function
const mockDispatch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders header component", () => {
  render(<Header dispatch={mockDispatch} />);

  // Check if the header element is rendered
  expect(screen.getByTestId("header")).toBeInTheDocument();

  // Check if the "todos" heading is rendered
  expect(screen.getByText("todos")).toBeInTheDocument();

  // Check if the input element is rendered
  const inputElement = screen.getByLabelText("New Todo Input");
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute("placeholder", "What needs to be done?");
  expect(inputElement).toHaveAttribute("id", "todo-input");
});

test("dispatches ADD_ITEM action on Enter key press", async () => {
  render(<Header dispatch={mockDispatch} />);

  // Get the input element
  const inputElement = screen.getByLabelText("New Todo Input");

  // Mock user input and trigger Enter key press
  userEvent.type(inputElement, "New Todo Item{enter}");

  // Wait for the next tick to allow for asynchronous updates (if any)
  await waitFor(() => {
    // Check if the dispatch function was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith({
      "payload": {"title": "New Todo Item"}, "type": "ADD_ITEM"
    });
  });
});