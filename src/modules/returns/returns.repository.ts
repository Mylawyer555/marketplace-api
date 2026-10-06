import { db } from "../../config/db"
import { Returns } from "./returns.types"

export const findOrderItemByItemId = async (
    itemId: number
) => {
    return db.orderItem.findUnique({
        where: {
            item_id: itemId
        },
        include: {
            orders: {
                select: {
                    buyer_id: true,
                    status: true
                }
            }
        }
    })
}

export const createReturn = async (itemId:number, data: Returns) => {
    return db.return.create({
        data: {
            order_item_id: itemId,
            quantity: data.quantity,
            reason: data.reason,
            status: "REQUESTED",
            requested_at: new Date()
        }
    })
}
