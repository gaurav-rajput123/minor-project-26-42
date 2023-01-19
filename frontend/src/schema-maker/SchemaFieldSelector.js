import React, { useContext, useRef, useState } from "react";
import { SchemaContext } from "../context-files/context";

function SchemaFieldSelector({ fieldIndex }) {
  const schemaContext = useContext(SchemaContext);
  const [fieldName, setFieldName] = useState("");
  const typeArray = [{ dataType: "s", dataName: "String" }];

  const fieldNameRef = useRef(null);
  const typeRef = useRef(null);

  function changeFieldName() {
    let field = fieldNameRef?.current;
    if (field) {
      setFieldName(field.value);
    }
  }
  function updateSchema() {
    let type = typeRef?.current;
    if (type) schemaContext.changeSchema(fieldIndex, fieldName, type.value);
  }
  return (
    <div className="flex justify-between items-center py-2 px-4 my-2 border border-black  w-[80%] bg-[#EEEEEE]">
      <input
        className="leading-2 py-2 px-2 border border-zinc-700 rounded-md w-[50%]"
        placeholder="Enter the name of the new field"
        value={fieldName}
        ref={fieldNameRef}
        onChange={changeFieldName}
        onBlur={updateSchema}
      />
      <select defaultValue={"s"} ref={typeRef} onChange={updateSchema}>
        {typeArray.map((type, typeIndex) => {
          return (
            <option value={type.dataType} key={type.dataName + typeIndex}>
              {type.dataName}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SchemaFieldSelector;
