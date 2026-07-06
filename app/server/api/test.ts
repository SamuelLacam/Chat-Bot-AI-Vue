import { getPool } from "../utils/poolDB";

export default defineEventHandler(async () => {
  const db = getPool();
  const [results] = await db.execute("select * from user");
  return results;
});
// export default defineEventHandler(async () => {
//   const db = await ConnectionDB.getInstance();
//   const user = db.execute("select * from user");
//   return user;
// });
