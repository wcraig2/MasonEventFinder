import { VercelPool, createPool } from '@vercel/postgres';

import { POSTGRES_URL } from '$env/static/private';

async function createUserTable(db: VercelPool) {
	await db.sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `;

	/* table ideas
	 	CREATE TABLE IF NOT EXISTS place(
			id SERIAL PRIMARY KEY
			name VARCHAR(255) NOT NULL,
			lat FLOAT NOT NULL DEFAULT 0,
			long FLOAT NOT NULL DEFAULT 0,
			type ENUM("Restaurant", "Entertainment", "Business", ...) DEFAULT NULL,
			tags VARCHAR(255) DEFAULT NULL,
			summary VARCHAR(255) DEFAULT NULL
		)

		CREATE TABLE IF NOT EXISTS event(
			id SERIAL PRIMARY KEY
			name VARCHAR(255) NOT NULL,
			type VARCHAR(255) DEFAULT NULL,
			time DATE DEFAULT NULL,
			tags VARCHAR(255) DEFAULT NULL,
			info VARCHAR(255) DEFAULT NULL,
			placeId INT FOREIGN KEY REFERENCES place(id)
		)
	 */
}

export async function load() {
	const db = createPool({
		connectionString: POSTGRES_URL,
	})
	const startTime = Date.now();

	await createUserTable(db);

	try {
		const { rows: users } = await db.query('SELECT * FROM users');
		const duration = Date.now() - startTime;

		// This object is put into the "export let data"
		// component field inside of the +page.svelte file.
		// It can be included in components if explicitly passed as well.
		// For example:
		// Inside of Map.svelte:
		//	<script>
		//  	export let data;
		//  </script>
		//
		// Inside of +page.svelte:
		//  <script>
		// 		export let data; <-- this one is from +page.server.ts
		//  </script> 
		// 
		// <Map {data}/> <-- The data object is explicitly passed into the Map component.
		return {
			users: users,
			duration: duration
		};
		
	} catch (error) {
		if (error?.message === `relation "users" does not exist`) {
			console.log('Table does not exist, creating and seeding it with dummy data now...');
			// Table is not created yet
			const { rows: users } = await db.query('SELECT * FROM users');
			const duration = Date.now() - startTime;
			return {
				users: users,
				duration: duration
			};
		} else {
			throw error;
		}
	}
}
