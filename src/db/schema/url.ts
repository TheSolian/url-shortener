import { user } from '@/db/schema/auth';
import { sql } from 'drizzle-orm';
import { index, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const urls = pgTable(
    'urls',
    {
        id: text('id').primaryKey(),
        url: text('url').notNull(),
        code: text('code').notNull().unique(),
        uses: integer('uses').default(0).notNull(),
        userId: text('user_id')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        deletedAt: timestamp('deleted_at'),
    },
    (table) => [index('code_idx').on(table.code)]
);

export type Url = typeof urls.$inferSelect;
