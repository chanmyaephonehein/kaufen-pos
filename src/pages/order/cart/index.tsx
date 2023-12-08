import { useAppSelector } from "@/store/hooks";
import { selectCart } from "@/store/slices/cartSlice";
import { Typography } from "@mui/material";

const Cart = () => {
  const { items } = useAppSelector(selectCart);
  const amount = items.length;
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
                <Typography>{item.quantity}</Typography>
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
