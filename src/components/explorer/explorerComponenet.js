import { useState } from "react";

const ExplorerComponent = ({ fileData, onAddFileOrFolder }) => {
  const [isExpnd, setIsExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false
  });

  const addNewFolder = (e, folderId, isFolder) => {
    e.stopPropagation();
    setIsExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const resetState = () => {
    setShowInput({
      visible: false,
      isFolder: false
    });
  };

  const addFileOrFolder = (e, folderId, isFolder) => {
    if (e.keyCode === 13) {
      onAddFileOrFolder(e.target.value, folderId, isFolder, fileData);
      resetState();
    }
  };

  if (fileData.isFolder) {
    return (
      <div style={{ textAlign: "left", cursor: "pointer", width: "350px" }}>
        <p
          onClick={() => setIsExpand(!isExpnd)}
          style={{ backgroundColor: "lightgray" }}
        >
          📁{fileData.name}
          <button
            onClick={(e) => addNewFolder(e, fileData.id, true)}
            style={{ float: "right" }}
          >
            + Folder
          </button>
          <button
            onClick={(e) => addNewFolder(e, fileData.id, false)}
            style={{ float: "right" }}
          >
            + File
          </button>
        </p>
        {isExpnd && showInput.visible && (
          <div style={{ display: "flex" }}>
            {showInput.isFolder ? <span>📁</span> : <span>📄</span>}
            <input
              type="text"
              autoFocus
              onBlur={() => resetState()}
              onKeyDown={(e) =>
                addFileOrFolder(e, fileData.id, showInput.isFolder)
              }
            />
          </div>
        )}
        {isExpnd &&
          fileData.items.map((f) => {
            return (
              <p style={{ marginLeft: "10px" }}>
                <ExplorerComponent
                  fileData={f}
                  onAddFileOrFolder={onAddFileOrFolder}
                />
              </p>
            );
          })}
      </div>
    );
  } else {
    return <span>📄{fileData.name}</span>;
  }
};

export default ExplorerComponent;
