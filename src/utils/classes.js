export default function classes() {
  return Array.from(arguments)
    .map((arg) => {
      switch (typeof arg) {
        case "string": {
          return arg;
        }

        case "object": {
          if (arg === null) {
            return arg.trim();
          } else if (Array.isArray(arg)) {
            return classes(...arg);
          } else {
            return Object.entries(arg)
              .reduce(
                (acc, [key, value]) => (value ? `${acc} ${key}` : acc),
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
