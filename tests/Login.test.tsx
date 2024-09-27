import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Login } from "../src/pages/Login";

describe("Login Component", () => {
  it("should render Login component", () => {
    const mockSetToast = vi.fn();
    const mockSetIsAuthenticated = vi.fn();
    render(
      <Login
        setToast={mockSetToast}
        setIsAuthenticated={mockSetIsAuthenticated}
      />
    );

    expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ログイン" })
    ).toBeInTheDocument();
  });
});
