import { Prisma } from "@prisma/client/extension";
import { db } from "./config/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

async function main() {
  try {
   await db.users.delete({
    where: {
      user_id: 1,
    },
   })
    
  } catch (error) {
    if(error instanceof PrismaClientKnownRequestError){
      console.log(error.code);
      
    }
  }

}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await db.$disconnect();
  });
