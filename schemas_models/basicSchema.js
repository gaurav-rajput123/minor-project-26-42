import { makeSchema } from "./schemaGenerator";

let basicSchemaModel = makeSchema(
  mongoose,
  {
    batch: String,
    branch: String,
    data: Array,
  },
  "batchData"
);
console.log("basicSchemaModel");

module.exports = { basicSchemaModel };
