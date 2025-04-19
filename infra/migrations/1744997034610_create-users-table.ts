import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType("user_role", ["admin", "manager", "hr", "user"]);

  pgm.createTable("users", {
    id: {
      type: "serial",
      primaryKey: true,
      notNull: true,
      unique: true,
    },
    name: {
      type: "varchar(255)",
      notNull: true,
    },
    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "varchar(255)",
      notNull: true,
    },
    role: {
      type: "user_role",
      notNull: true,
      default: "user",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createConstraint("users", "role_check", {
    check: "role IN ('admin', 'manager', 'hr', 'user')",
  });
}
