import React, { useState } from "react";
import { SchemaContext } from "../context-files/context";
import SchemaBox from "./SchemaBox";

function SchemaForm() {
  const [schemaObject, setSchemaObject] = useState([]);
  const [name, setname] = useState("New Project");
  function clearSchema() {
    setSchemaObject([]);
  }
  function insertToSchema() {
    let newSchemaArray = [...schemaObject];
    newSchemaArray.push({
      key: "",
      value: "s",
    });
    setSchemaObject(newSchemaArray);
  }
  function removeFromSchema(index) {
    let newSchemaArray = [...schemaObject];
    newSchemaArray.splice(index, 1);
    setSchemaObject(newSchemaArray);
  }
  function changeSchema(index, newKey, newVal) {
    let newSchemaArray = [...schemaObject];
    let newObject = {
      key: newKey,
      value: newVal,
    };
    newSchemaArray[index] = newObject;
    setSchemaObject(newSchemaArray);
  }
  function changeSchemaName(newName) {
    setname(newName);
  }
  return (
    <SchemaContext.Provider
      value={{
        name,
        schemaObject,
        clearSchema,
        insertToSchema,
        removeFromSchema,
        changeSchema,
        changeSchemaName,
      }}
    >
      <SchemaBox />
    </SchemaContext.Provider>
  );
}

export default SchemaForm;
