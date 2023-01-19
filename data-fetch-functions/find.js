import { jsonReturnHandler } from "../utils/returnHandler";

export async function findUsingFindOne(model, findParameters, limit) {
  try {
    let callClient = model.find(findParameters);
    if (Boolean(limit)) {
      callClient = callClient.limit(limit);
    }
    let mongoCall = await callClient;
    return jsonReturnHandler(mongoCall, null);
  } catch (error) {
    return jsonReturnHandler(null, error);
  }
}
