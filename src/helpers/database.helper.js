import fs from "fs";
import path from "path";

export const readDatabase = () => {
  const dataPath = path.join(__dirname, "bd.json");
  const data =  JSON.parse(fs.readFileSync(dataPath, "utf8"));
  return data;
};
