import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import PetsIcon from "@mui/icons-material/Pets";

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
  const showLogo = !isActiveOrder;
  const { locations } = useAppSelector(appData);
  return (
    <div className="my-5 mx-64 flex flex-row justify-between items-center">
      {showLogo && (
        <div
          className="flex items-center gap-2 min-w-[100px] cursor-pointer"
          onClick={() => {
            router.push({ pathname: "/order", query });
          }}
        >
          <PetsIcon
            style={{
              color: "gray",
              fontSize: "30px",
            }}
          />
          <span className="text-xl">Kaufen</span>
        </div>
      )}
      {isHome && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-gray-600">
              {locations.map((item) => item.name)}
            </span>
            <span className="text-3xl text-gray-600">
              {locations.map((item) => item.address)}
            </span>
          </div>
        </div>
      )}
      {showCartIcon && (
        <div
          className="flex justify-end cursor-pointer min-w-[100px]"
          onClick={() => router.push({ pathname: "/order/cart", query })}
        >
          <div className="flex flex-col">
            {cartCountItem > 0 && (
              <Typography sx={{ display: "flex", justifyContent: "flex-end" }}>
                {cartCountItem}
              </Typography>
            )}
            <ShoppingCartCheckoutIcon
              style={{ color: "gray", fontSize: "30px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAppHeader;
