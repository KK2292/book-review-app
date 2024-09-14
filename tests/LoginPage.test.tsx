import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LoginPage } from "../src/pages/LoginPage";

test("LoginPageがレンダリングされている", () => {
  render(<LoginPage />);

  expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
  expect(screen.getByLabelText(/パスワード/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
});
