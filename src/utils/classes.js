export default function classes() {
  return Array.from(arguments)
    .map((arg) => {
      switch (typeof arg) {
        case "string": {
          return arg;
        }

        case "object": {
          if (arg === null) {
            return arg;
          } else if (Array.isArray(arg)) {
            return classes(...arg);
          } else {
            return Object.entries(arg)
              .reduce(
                (acc, [key, value]) =>
                  value && typeof value !== "function" ? `${acc} ${key}` : acc,
                ""
              )
              .trim();
          }
        }

        default:
          return "";
      }
    })
    .filter((e) => Boolean(e))
    .join(" ")
    .trim();
}
