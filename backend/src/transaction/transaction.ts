import db from "../../db/connection";

export const startTransaction = () => {
  return db.query("START TRANSACTION;");
};
export const commitTransaction = () => {
  return db.query("COMMIT;");
};
export const rollbackTransaction = () => {
  return db.query("ROLLBACK;");
};
