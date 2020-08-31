import React from "react";
import { render } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

import Dropzone from "./Dropzone";
import { useDropzone } from "./hooks";

const onDrop = jest.fn((files) => files[0]);
const preventDefault = jest.fn((e) => true);
const persist = jest.fn((e) => true);

test("Dropzone smoke test", () => {
  const { getByTestId } = render(<Dropzone />);

  getByTestId("Dropzone");
});

test("test Dropzone hook", () => {
  const { result } = renderHook(() => useDropzone({ onDrop }));

  const [zone, input] = result.current;

  act(() => {
    zone.onDrop({
      preventDefault,
      persist,
      dataTransfer: { files: ["file mock onDrop", 2, 3] },
    });
  });

  expect(preventDefault.mock.calls.length).toBe(1);
  expect(persist.mock.calls.length).toBe(1);
  expect(onDrop.mock.calls.length).toBe(1);
  expect(onDrop.mock.results[0].value).toBe("file mock onDrop");

  act(() => {
    input.onChange({
      persist,
      target: { files: ["file mock onChange", 3, 4] },
    });
  });

  expect(persist.mock.calls.length).toBe(2);
  expect(onDrop.mock.calls.length).toBe(2);
  expect(onDrop.mock.results[1].value).toBe("file mock onChange");
});
