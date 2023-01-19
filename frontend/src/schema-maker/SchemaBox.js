import axios from "axios";
import React, { useContext } from "react";
import { createNewModel } from "../callUrls";
import { SchemaContext } from "../context-files/context";
import { handleException } from "../expectionHandler";
import SchemaFieldSelector from "./SchemaFieldSelector";

function SchemaBox() {
  const schemaContext = useContext(SchemaContext);
  function validateForm(form) {
    for (let obj of form) {
      if (obj.key.length == 0) {
        return 0;
      }
    }
    return 1;
  }
  function createSchemaFromSchemaObject() {
    let schema = {};
    for (let object of schemaContext.schemaObject) {
      console.log(object);
      schema[object.key] = object.value;
    }
    return schema;
  }

  async function sendForm() {
    try {
      console.log(validateForm(schemaContext.schemaObject));
      if (validateForm(schemaContext.schemaObject)) {
        let schmea = createSchemaFromSchemaObject();
        let call = await axios({
          url: createNewModel,
          data: {
            schema: schmea,
            secretKey:
              "$2b$10$RpR8ir7VD/kY3lv2tdIcBes8OIhPCJQFdSEtn1lDtOJSA87XBAWOa",
            modelName: "new-model",
          },
          method: "POST",
        });
        console.log(call);
      } else {
        throw new Error("1");
      }
    } catch (error) {
      console.log(error.message);
      handleException(error.message);
    }
  }
  return (
    <>
      <div className="border-t border-[grey]">
        <div className="flex justify-between py-2">
          <span className="font-xl font-semibold">{schemaContext.name}</span>
          <button
            className="px-2 py-1 text-white bg-zinc-700 rounded-[6px] hover:bg-white hover:text-zinc-700 hover:border hover:border-black"
            onClick={schemaContext.insertToSchema}
          >
            Add New Field
          </button>
        </div>
        <div className="py-4">
          {schemaContext.schemaObject.map((object, objectIndex) => {
            return <SchemaFieldSelector fieldIndex={objectIndex} />;
          })}
        </div>
        <div className="flex justify-end my-4">
          <button
            className="px-2 py-1 text-white bg-zinc-700 rounded-[6px] hover:bg-white hover:text-zinc-700 hover:border hover:border-black"
            onClick={() => {
              console.log(schemaContext);
              sendForm();
            }}
          >
            Create Schema
          </button>
        </div>
      </div>
    </>
  );
}

export default SchemaBox;
