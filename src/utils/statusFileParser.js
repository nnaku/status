const splitPackages = new RegExp(/\n\n/);
const splitPackageRows = new RegExp(/\n(?!\s)/);
const rowToKeyValue = new RegExp(/:/); // TODO: Match only first "Key: "

function parseDependsFiel(depends) {
  return depends
    .trim()
    .replace(/ \(.+\)/gm, "") // get ridoff version data
    .split(", ") //  split each dep to own array element
    .map((d) => d.split(" | ")); // split alternatives
}

function rowKeyValueReducer(acc, curRow) {
  const [key, ...rest] = curRow.split(rowToKeyValue);

  const value = rest.join(":").trim();

  switch (key) {
    case "Package":
      return { ...acc, name: value };
    case "Description":
      return { ...acc, description: value };
    case "Depends":
      return { ...acc, depends: value };
    default:
      return acc;
  }
}

/**
 * parse packages from status file.
 * @param {File} file - staus file
 * @returns {Object} Object of package Objects
 */

export default async function statusFileParser(file) {
  // read file
  const fileAsString = await file.text();
  // split each pkg from txt file to own array element
  const pkgAsStrArray = fileAsString.trim().split(splitPackages);

  const pkgObj = pkgAsStrArray.reduce((acc, pgkAsStr) => {
    const pkgAsObj = pgkAsStr
      .split(splitPackageRows)
      .reduce(rowKeyValueReducer, {});

    pkgAsObj.depends = pkgAsObj.depends
      ? parseDependsFiel(pkgAsObj.depends)
      : [];

    return { ...acc, [pkgAsObj.name]: { ...pkgAsObj, dependents: null } };
  }, {});

  return pkgObj;
}
