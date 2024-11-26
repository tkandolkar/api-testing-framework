const Ajv = require("ajv");
const ajv = new Ajv();
const obsSchema = require('./observationsApiSchema.json');

// Generate the validator using "ajv module that will validate the schema for observations API"
export const validate = ajv.compile(obsSchema);