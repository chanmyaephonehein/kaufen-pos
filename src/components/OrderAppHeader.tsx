import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  cartCountItem: number;
}
const OrderAppHeader = ({ cartCountItem }: Props) => {
  const router = useRouter();
  const query = router.query;
  const isHome = router.pathname === "/order";
  const isCart = router.pathname === "/order/cart";
  const isActiveOrder = router.pathname.includes("/order/activeOrder");
  const showCartIcon = !isCart && !isActiveOrder;
  const { locations } = useAppSelector(appData);
  return (
    <div>
      {showCartIcon && (
        <div
          className="flex justify-end"
          onClick={() => router.push({ pathname: "/order/cart", query })}
        >
          <div className="flex flex-col">
            {cartCountItem > 0 && (
              <Typography sx={{ display: "flex", justifyContent: "flex-end" }}>
                {cartCountItem}
              </Typography>
            )}
            <ShoppingCartCheckoutIcon />
          </div>
        </div>
      )}
      {isHome && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <p>{locations.map((item) => item.name)}</p>
            <p>{locations.map((item) => item.address)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAppHeader;
