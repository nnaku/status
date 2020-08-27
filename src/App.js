import React, { useState, useCallback, useEffect } from "react";
import statusFileParser from "utils/statusFileParser";

import { useStoreActions, useStoreState } from "store/state";

function App() {
  const [files, setFiles] = useState();

  const state = useStoreState();
  const { setPackages } = useStoreActions();

  useEffect(() => {
    async function parse() {
      const data = await statusFileParser(files?.[0]);
      setPackages(data);
    }

    if (files) {
      parse();
    }
  }, [files, setPackages]);

  const handleChange = useCallback(
    (e) => {
      setFiles(e.target.files);
      console.log(e.target.files?.[0]);
    },
    [setFiles]
  );

  return (
    <div className="App">
      <input type="file" onChange={handleChange} files={files} />
      {/* <ul>
        {state.packageList.map((e) => (
          <li>{e}</li>
        ))}
      </ul> */}
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default App;
