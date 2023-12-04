import { render, screen } from "@testing-library/react";
import Toast from "./";

test("should show toast text and disappear after some seconds", async () => {
  jest.useFakeTimers();
  const turnOffFn = jest.fn();
  const text = "example text";
  render(<Toast text={text} turnOff={turnOffFn} />);

  expect(turnOffFn).not.toBeCalled();

  expect(screen.getByText(text)).toBeVisible();

  // Fast-forward until all timers have been executed
  jest.runAllTimers();

  expect(turnOffFn).toBeCalled();
});
