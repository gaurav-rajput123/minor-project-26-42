import { createContext } from "react";

export const SchemaContext = createContext({
  name: "",
  schemaObject: [],
  clearSchema: () => {},
  insertToSchema: () => {},
  removeFromSchema: () => {},
  changeSchema: () => {},
  changeSchemaName: () => {},
});
