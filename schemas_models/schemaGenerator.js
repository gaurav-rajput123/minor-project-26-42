function makeSchema(mongoose, schemaDetails, modelName) {
  let Schema = mongoose.Schema;
  let newSchema = new Schema(schemaDetails);
  let model = mongoose.model(modelName, newSchema);
  return model;
}

module.exports = { makeSchema };
