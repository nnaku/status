import React, { useState, useCallback, useEffect } from "react";
import statusFileParser from "utils/statusFileParser";

import { useStoreActions, useStoreState } from "./store";
import Link from "components/Link";
import List from "components/List";
import ListItem from "components/ListItem";

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
      <List>
        {state.packageList.map((e) => (
          <ListItem key={e} id={e}>
            <Link href={`#${e}`}>{e}</Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
