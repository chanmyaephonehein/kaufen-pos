import DeleteDialog from "@/components/DeleteDialog";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart, selectCart } from "@/store/slices/cartSlice";
import { fetchOrderlines } from "@/store/slices/orderlinesSlice";
import { addOrder } from "@/store/slices/ordersSlice";
import { getCartTotalPrice, getMenuTotalPrice } from "@/utils/client";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const Cart = () => {
  const { items } = useAppSelector(selectCart);
  const amount = items.length;
  const router = useRouter();
  const query = router.query;
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const confirmOrder = async () => {
    const locationId = router.query.locationId;
    const tableId = router.query.tableId;
    const isValid = locationId && tableId && items.length;
    if (!isValid) return alert("Something Error");
    const response = await fetch(
      `${config.apiBaseUrl}/app?locationId=${locationId}&tableId=${tableId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      }
    );
    const data = await response.json();
    dispatch(addOrder(data));
    dispatch(fetchOrderlines(""));
    router.push({ pathname: `/order/activeOrder/${data.id}`, query });
  };
  return (
    <div className="flex justify-center">
      {amount > 0 ? (
        <div>
          <Typography variant="h2">Confirm your order</Typography>
          <div>
            {items.map((item) => (
              <div key={item.id}>
                <DeleteDialog
                  open={open}
                  setOpen={setOpen}
                  title="menu from cart"
                  callback={() => {
                    dispatch(removeFromCart(item));
                  }}
                />
                <div className="mt-5 flex justify-between">
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {item.menu.name}
                  </Typography>
                  <Typography variant="h5">{item.menu.price}</Typography>
                </div>
                <Box>
                  {item.addon.map((i) => (
                    <div
                      key={i.id}
                      className="flex justify-between items-center"
                    >
                      <div>{i.name}</div>
                      <div>{i.price}</div>
                    </div>
                  ))}
                </Box>
                <Typography sx={{ color: "blue" }}>
                  Quantity: {item.quantity}
                </Typography>
                <Typography sx={{ color: "blue" }}>
                  Price: {getMenuTotalPrice(item)} MMK
                </Typography>
                <div className="flex flex-row justify-end ">
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    sx={{ ml: 2 }}
                    variant="contained"
                    onClick={() =>
                      router.push({
                        pathname: `/order/updateMenu/${item.id}`,
                        query,
                      })
                    }
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex flex-row justify-center items-center my-3">
              <Typography variant="h5">
                Total Price = {getCartTotalPrice(items)} MMK
              </Typography>
            </div>
            <div className="flex justify-center mt-3">
              <Button onClick={confirmOrder} variant="contained">
                Confirm order
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>Your cart is empty</div>
        </div>
      )}
    </div>
  );
  //
};

export default Cart;
