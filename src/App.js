import "./styles.css";

import ExplorerComponent from "./components/explorer/explorerComponenet";
import fileData from "./data/folderData";
import { useState } from "react";

export default function App() {
  const [explorerData, setExplorerData] = useState(fileData);

  const onAddFileOrFolder = (value, folderId, isFolder, treeData) => {
    debugger;
    if (treeData.id === folderId && treeData.isFolder) {
      treeData.items.unshift({
        id: new Date().getTime(),
        name: value,
        isFolder,
        items: []
      });
      setExplorerData(treeData);
    } else {
      treeData.items.map((tree) => {
        if (tree.id === folderId && tree.isFolder) {
          onAddFileOrFolder(value, tree.id, isFolder, tree);
        }
      });
    }
  };
  return (
    <div className="App">
      <ExplorerComponent
        onAddFileOrFolder={onAddFileOrFolder}
        fileData={explorerData}
      />
    </div>
  );
}
