import { sql } from "drizzle-orm";
import { Elysia } from "elysia";
import { db } from "./db";
import * as schema from "./schema";

const app = new Elysia()
	.get("/", () => {
		const query = sql`select "hello world" as text`;
		const result = db.get<{ text: string }>(query);
		return result;
	})
	.get("/seed", async () => {
		await db.insert(schema.movies).values([
			{
				title: "The Matrix",
				releaseYear: 1999,
			},
			{
				title: "The Matrix Reloaded",
				releaseYear: 2003,
			},
			{
				title: "The Matrix Revolutions",
				releaseYear: 2003,
			},
		]);

		console.log("Seeding complete.");
	})
	.get("/result", async () => {
		const result = await db.select().from(schema.movies);
		return result;
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
