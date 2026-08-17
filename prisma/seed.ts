import { db } from "../src/config/db";

async function main() {
    const user = await db.users.create({
        data: {
            email: "seed@example.com",
            first_name: "seed",
            last_name: "User",
            hash_password: "hashed-password",
        },
    });

    
    const store = await db.stores.create({
        data: {
            store_name: "Seed Marketplace store",
            description: "A sample marketplace store",
            users: {
                connect: {
                    user_id: user.user_id,
                },
            },
        }
    })
    console.log("Created user:", user);
    console.log("Created store:", store);
    
}
main()
.catch((error) => {
    console.error(error);
    process.exit(1); 
})
.finally(async () => {
    await db.$disconnect()
});