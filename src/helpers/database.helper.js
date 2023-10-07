import { config } from "./bd.js";

export const readDatabase = () => {
  console.log(config.data);
  return config.data;
};
