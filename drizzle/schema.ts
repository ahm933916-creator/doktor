import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/** Platform identity table retained from the Expo starter. */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const clinicSettings = mysqlTable("clinic_settings", {
  id: int("id").autoincrement().primaryKey(),
  clinicName: varchar("clinicName", { length: 160 }).notNull().default("العيادة الشاملة"),
  currency: varchar("currency", { length: 16 }).notNull().default("ل.س"),
  exchangeRate: int("exchangeRate").notNull().default(1),
  theme: varchar("theme", { length: 32 }).notNull().default("light"),
  storagePath: text("storagePath"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const clinicUsers = mysqlTable("clinic_users", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull().unique(),
  role: mysqlEnum("role", ["patient", "secretary", "doctor"]).notNull(),
  isActive: int("isActive").notNull().default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const patients = mysqlTable("patients", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull().unique(),
  age: int("age"),
  treatmentStatus: varchar("treatmentStatus", { length: 80 }).default("قيد المتابعة"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const availabilitySlots = mysqlTable("availability_slots", {
  id: int("id").autoincrement().primaryKey(),
  slotDate: varchar("slotDate", { length: 32 }).notNull(),
  startTime: varchar("startTime", { length: 8 }).notNull(),
  endTime: varchar("endTime", { length: 8 }).notNull(),
  status: mysqlEnum("status", ["available", "reserved", "blocked"]).notNull().default("available"),
  note: text("note"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),
  patientId: int("patientId").notNull(),
  slotId: int("slotId"),
  reason: varchar("reason", { length: 240 }),
  status: mysqlEnum("status", ["pending", "accepted", "completed", "cancelled"]).notNull().default("pending"),
  source: mysqlEnum("source", ["patient", "secretary", "doctor"]).notNull().default("patient"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const patientNotes = mysqlTable("patient_notes", {
  id: int("id").autoincrement().primaryKey(),
  patientId: int("patientId").notNull(),
  authorId: int("authorId"),
  noteType: varchar("noteType", { length: 64 }).default("medical"),
  body: text("body").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const patientFiles = mysqlTable("patient_files", {
  id: int("id").autoincrement().primaryKey(),
  patientId: int("patientId").notNull(),
  title: varchar("title", { length: 160 }).notNull(),
  storageKey: varchar("storageKey", { length: 512 }).notNull(),
  stableUrl: varchar("stableUrl", { length: 768 }),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  deletedAt: timestamp("deletedAt"),
});

export const invoices = mysqlTable("invoices", {
  id: int("id").autoincrement().primaryKey(),
  patientId: int("patientId").notNull(),
  invoiceNumber: varchar("invoiceNumber", { length: 64 }).notNull().unique(),
  totalAmount: int("totalAmount").notNull().default(0),
  paidAmount: int("paidAmount").notNull().default(0),
  note: text("note"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  patientId: int("patientId").notNull(),
  invoiceId: int("invoiceId"),
  amount: int("amount").notNull(),
  method: varchar("method", { length: 32 }).default("cash"),
  note: text("note"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const expenses = mysqlTable("expenses", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 160 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  amount: int("amount").notNull(),
  note: text("note"),
  expenseDate: varchar("expenseDate", { length: 32 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type ClinicSetting = typeof clinicSettings.$inferSelect;
export type Patient = typeof patients.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type PatientNote = typeof patientNotes.$inferSelect;
export type PatientFile = typeof patientFiles.$inferSelect;
export type Invoice = typeof invoices.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Expense = typeof expenses.$inferSelect;
