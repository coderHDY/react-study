import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("has correct welcome text", () => {
  render(<Home />);
  expect(screen.getByText(`2`)).toBeInTheDocument();
});
