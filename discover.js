import { randomFact } from "./facts.js";

export function chooseRandom(facts, currentId = "") {
  return randomFact(facts, currentId);
}
