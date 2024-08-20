import { integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';


export const usersTable = pgTable('users', {
    email: text('email').primaryKey(),
    name: text('name').notNull(),
  });
  
  export const chatTable = pgTable('chat', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    user_email: text('user_email')
      .notNull()
      .references(() => usersTable.email, { onDelete: 'cascade' }),
  });
  
  export const messageTable = pgTable('message', {
    id: serial('id').primaryKey(),
    content: text('content').notNull(),
    sender:text('sender').notNull(),
    chat_id: integer('chat_id')
      .notNull()
      .references(() => chatTable.id, { onDelete: 'cascade' }),
  });
  
  export const chatRelations = relations(chatTable, ({ one, many }) => ({
    messages: many(messageTable),
    user: one(usersTable, { fields: [chatTable.user_email], references: [usersTable.email] }),
  }));
  
  export const messageRelations = relations(messageTable, ({ one }) => ({
    chat: one(chatTable, { fields: [messageTable.chat_id], references: [chatTable.id] }),
  }));
  
  
  