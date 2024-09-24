/// <reference types="jest" />
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Login } from "../src/pages/Login";

test("Loginがレンダリングされている", () => {
  render(<Login />);

  expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
  expect(screen.getByLabelText(/パスワード/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
});
