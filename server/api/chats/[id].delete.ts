import { ResultSetHeader } from "mysql2";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    if (!id || Number.isNaN(Number(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: "Param error",
        message: "It must have an id param and it must be a number",
      });
    }

    const userId = event.context.user?.userId;
    const db = getPool();
    /* const [result] = */ await db.execute<ResultSetHeader>(
      "delete from conversation where id = ? and user_id = ?",
      [id, userId],
    );
    // return { affectedRows: result.affectedRows };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw new ServerError();
  }
});
