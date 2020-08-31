import fs from "fs";
import classes from "./classes";
import statusFileParser from "./statusFileParser";

test("classes util test", () => {
  expect(classes()).toBe("");
  expect(classes(() => "true")).toBe("");
  expect(
    classes(
      null,
      0,
      false,
      false && "doNotExist",
      { doNotExist: null },
      { doNotExist: 0 },
      { doNotExist: false },
      { doNotExist: false && "doNotExist" },
      { doNotExist: () => false }
    )
  ).toBe("");

  expect(classes("foo", "bar")).toBe("foo bar");
  expect(classes(["foo", "bar"])).toBe("foo bar");
  expect(classes({ foo: true }, { bar: false })).toBe("foo");

  expect(
    classes(
      "foo",
      false && "fiss",
      "bar",
      { haa: false },
      true && "buzz",
      { huu: true },

      [
        "Afoo",
        "Abar",
        false && "Afiss",
        true && "Abuzz",
        { Ahuu: true },
        { Ahaa: false },
      ]
    )
  ).toBe("foo bar buzz huu Afoo Abar Abuzz Ahuu");
});

test("statusFileParser util test w/ bad file", () => {
  const badMockFile = { text: () => Promise.resolve("") };

  expect(statusFileParser(badMockFile)).rejects.toThrowError("Bad file?");
});

test("statusFileParser util test /w good file", () => {
  const fileData = fs.readFileSync("status.real", "utf8");
  const mockFile = { text: () => Promise.resolve(fileData) };

  expect(statusFileParser(mockFile)).resolves.toHaveProperty(
    "libws-commons-util-java",
    {
      dependents: null,
      depends: [],
      description:
        "Common utilities from the Apache Web Services Project\n This is a small collection of utility classes, that allow high\n performance XML processing based on SAX.",
      name: "libws-commons-util-java",
    }
  );
});
