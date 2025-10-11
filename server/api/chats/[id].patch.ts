export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    if (!id || Number.isNaN(Number(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: "Param error",
        message: "It must have a id param and it must be a number",
      });
    }

    const { name } = await readBody(event);
    const userId = event.context.user.userId;
    const db = getPool();
    console.log(name);
    console.log(userId);
    console.log(id);
    await db.execute("update conversation set name = ? where id = ? and user_id = ?", [
      name,
      id,
      userId,
    ]);
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw new ServerError();
  }
});
