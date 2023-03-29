import React from "react";
import { render, screen } from "@testing-library/react";
import { AnswerPopup } from "./AnswerPopup";

describe("AnswerPopup component", () => {
  it("renders Correct message when show is true", () => {
    render(<AnswerPopup show={true}>Correct!</AnswerPopup>);

    const messageElement = screen.getByText(/Correct!/i);
    expect(messageElement).toBeInTheDocument();
  });

  it("renders Wrong message when show is true", () => {
    render(<AnswerPopup show={true}>Wrong!</AnswerPopup>);

    const messageElement = screen.getByText(/Wrong!/i);
    expect(messageElement).toBeInTheDocument();
  });

  it("does not render any message when show is false", () => {
    render(<AnswerPopup show={false}>Correct!</AnswerPopup>);

    const messageElement = screen.queryByText(/Correct!/i);
    expect(messageElement).toBeNull();
  });
});
