import { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType("entry_type", ["in", "out"]);

  pgm.createTable("entries", {
    id: {
      type: "serial",
      primaryKey: true,
      notNull: true,
      unique: true,
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },
    timestamp: {
      type: "timestamp",
      notNull: true,
    },
    type: {
      type: "entry_type",
      notNull: true,
      default: "in",
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

  pgm.createConstraint("entries", "type_check", {
    check: "type IN ('in', 'out')",
  });
}
