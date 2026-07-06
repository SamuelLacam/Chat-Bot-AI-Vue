import mysql from "mysql2/promise";

export class ConnectionDB {
  private static instance: ConnectionDB;

  public db: mysql.Connection | undefined;

  private constructor() {}

  public static async getInstance() {
    if (!this.instance) {
      this.instance = new ConnectionDB();
      this.instance.db = await this.instance.connect();
    }
    return this.instance.db;
  }

  private async connect() {
    try {
      return await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "gizelle",
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
