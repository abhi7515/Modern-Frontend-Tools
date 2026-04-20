import "./styles.css";
import {useState, useEffect} from 'react'; 

 const fileStructure = {
    id: 1,
    name: "folder1",
    type: "folder",
    children: [
      {
        id: 2,
        name: "folder2",
        type: "folder",
        children: [
          {
            id: 4,
            name: "file1",
            type: "file",
            children: []
          }
        ]
      },
      {
        id: 3,
        name: "file5",
        type: "file",
        children: []
      },
      {
        id: 6,
        name: "file6",
        type: "file",
        children: []
      },
      {
        id: 7,
        name: "folder3",
        type: "folder",
        children: [
          {
            id: 8,
            name: "file98",
            type: "file",
            children: []
          },
          {
            id: 9,
            name: "file89",
            type: "file",
            children: []
          }
        ]
      },
    ]
  }

const Folder = ({item, addFile, deleteItem}) => {

  return <>
    <div style={styles.file }>{item.name}
 
    {item.type === "folder" && (
          <>
            <button onClick={() => addFile(item.id, "file")}>+ File</button>
            <button onClick={() => addFile(item.id, "folder")}>
              + Folder
            </button>
          </>
        )}

        {item.id !== 1 && (
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        )}
   </div>
    {<div style={styles.children}>{item.children?.length?item?.children.map((child,idx) => (
      <Folder key={child.id} item={child} addFile={addFile} deleteItem={deleteItem}/>
    )):null}</div>}
    </>
}

export default function App() {
 const [tree, setTree] = useState(fileStructure)

 const addFile = (parentId, type) => {
  const name = prompt(`Enter ${type} name`);
  if (!name?.trim()) return;

  const addNode = (node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [
          ...node.children,
          {
            id: Date.now(),
            name,
            type,
            children: type === "folder" ? [] : []
          }
        ]
      };
    }

    return {
      ...node,
      children: node.children?.map(addNode)
    };
  };

  setTree((prev) => addNode(prev));
};
 const deleteItem = (id) => {
  const removeNode = (node) => {
    return {
      ...node,
      children: node.children
        ?.filter((child) => child.id !== id)
        .map(removeNode)
    };
  };

  setTree((prev) => removeNode(prev));
};
  return (
    <div className="App">
        <Folder item={tree} addFile={addFile} deleteItem={deleteItem}/>
    </div>
  );
}


const styles = {
  file:{
    'marginTop': "8px",
    'marginLeft': '10px',
  },
  children:{
     'marginLeft': '20px',
  }
}
