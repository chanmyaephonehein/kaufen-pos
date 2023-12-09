import { useAppSelector } from "@/store/hooks";
import { selectCart } from "@/store/slices/cartSlice";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Cart = () => {
  const { items } = useAppSelector(selectCart);
  const amount = items.length;
  const router = useRouter();
  const query = router.query;
  return (
    <div>
      {amount > 0 ? (
        <div>
          <div>
            {items.map((item) => (
              <div key={item.id}>
                <Typography>{item.id}</Typography>
                <Typography>{item.menu.name}</Typography>
                <Typography>{item.menu.price}</Typography>
                <Box>
                  {item.addon.map((i) => (
                    <div key={i.id}>{i.name}</div>
                  ))}
                </Box>
                <Typography>{item.quantity}</Typography>
                <Button
                  onClick={() =>
                    router.push({
                      pathname: `/order/updateMenu/${item.id}`,
                      query,
                    })
                  }
                >
                  Edit
                </Button>
                <Typography>Delete</Typography>
              </div>
            ))}
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
