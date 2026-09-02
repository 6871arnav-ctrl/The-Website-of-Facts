import { searchFacts } from "./facts.js";

export function attachSearch(input, facts, callback) {
  const run = () => callback(searchFacts(facts, input.value));
  input.addEventListener("input", run);
  return run;
}
