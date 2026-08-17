import { db } from "./config/db";

async function main() {
const result = await db.$transaction(async (tx) => {
    //find product
    const product = await tx.products.findUnique({
      where: {
        product_id: 7,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Atomically reserve or decrease stock
    const stockUpdate = await tx.inventory.updateMany({
      where: {
        product_id: 7,
        stock_quantity: {
          gte: 1,
        },
      },
      data: {
        stock_quantity: {
          decrement: 1,
        },
      },
    });

    //if nobody was able to reserve stock, the product is out of stock.
    if (stockUpdate.count === 0) {
      throw new Error("Out of stock");
    }

    // create order
    const order = await tx.orders.create({
      data: {
        users: {
          connect: {
            user_id: 1,
          },
        },
        shipping_phone_number: "09034564325",
        shipping_name: "Edith Tom",
        shipping_postal_code: "00234",
        shippping_city: "port harcourt",
        shipping_street: "Solution avenue",
        shipping_state: "Rivers State",
        shipping_country: "Nigeria",
        order_number: "ODX2222",
        status: "PENDING",
        total_amount: product.price,
      },
    });

    // create order item

    const orderItem = await tx.order_items.create({
      data: {
        orders: {
          connect: {
            order_id: order.order_id,
          },
        },

        products: {
          connect: {
            product_id: product.product_id,
          },
        },
        quantity: 1,
        price_at_purchase: product.price,
      },
    });

    return {
      order,
      orderItem,
    };
  });

  console.log(result);
  


  
}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await db.$disconnect();
  });


