ALTER TABLE "inventory"
ADD CONSTRAINT "inventory_quantity_check"
CHECK (
    "reserved_quantity" >= 0
    AND "reserved_quantity" <= "stock_quantity"
);