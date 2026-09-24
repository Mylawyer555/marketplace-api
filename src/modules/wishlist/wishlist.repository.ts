import { db } from "../../config/db";
import { AddWishList } from "./wishlist.types";

export const findProductById = async (productId: number) => {
  return db.product.findUnique({
    where: {
      product_id: productId,
    },
    select: {
      status: true,
    },
  });
};

export const findWishlist = async (userId: number, productId: number) => {
  return db.wishlist.findUnique({
    where: {
      user_id_product_id: {
        user_id: userId,
        product_id: productId,
      },
    },
  });
};

export const createWishList = async (userId: number, data: AddWishList) => {
  return db.wishlist.create({
    data: {
      user_id: userId,
      product_id: data.productId,
    },
  });
};

export const findWishListByUserId = async (userId: number) => {
  return db.user.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      wishlists: {
        select: {
          wishlist_id: true,
          product_id: true,
          products: {
            select: {
              product_id: true,
              product_name: true,
              status: true,
              images: {
                select: {
                  productimage_id: true,
                  image_url: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const findWishlistById = async (wishlistId: number) => {
  return db.wishlist.findUnique({
    where: {
      wishlist_id: wishlistId
    }
  })
}

export const deleteWishlist = async (wishlistId: number) => {
  return db.wishlist.delete({
    where: {
      wishlist_id: wishlistId,
    },
  });
};
