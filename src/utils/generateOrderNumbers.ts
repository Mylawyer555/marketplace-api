import crypto from 'crypto'
export const generateOrderNumber = () =>{
    const timestamp = Date.now()
    const randomChar = crypto.randomBytes(6).toString("hex")
    return `ODX-${timestamp}-${randomChar}`

} 