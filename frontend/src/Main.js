import React from "react";
import { SchemaContext } from "./context-files/context";
import Header from "./header/Header";
import SchemaBox from "./schema-maker/SchemaBox";
import SchemaForm from "./schema-maker/SchemaForm";

function Main() {
  return (
    <div>
      <div className="h-[200px]"></div>
      <div className="flex">
        <div className="mx-auto w-[700px]">
          <SchemaForm />
        </div>
      </div>
    </div>
  );
}

export default Main;
