import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChatButton from "../components/ChatButton";
import { renderWithProviders } from "../utils/testUtils";

test("renders ChatButton", async () => {
  renderWithProviders(<ChatButton />);

  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("tooltip")).toBeVisible();
});
