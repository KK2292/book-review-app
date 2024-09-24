/// <reference types="jest" />
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Login } from "../src/pages/Login";

test("Loginがレンダリングされている", () => {
  const mockSetToast = jest.fn();
  const mockSetIsAuthenticated = jest.fn();
  render(
    <Login
      setToast={mockSetToast}
      setIsAuthenticated={mockSetIsAuthenticated}
    />
  );

  expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
  expect(screen.getByLabelText(/パスワード/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
});
