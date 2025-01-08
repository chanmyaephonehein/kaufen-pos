import { MostOrdered } from "@/pages/backoffice/dashboard";
import { CartItem } from "@/store/slices/cartSlice";
import {
  AddonCategories,
  Addons,
  Locations,
  Menus,
  MenusAddonCategories,
  MenusMenuCategoriesLocations,
  Orderlines,
  Orders,
} from "@prisma/client";
import { Addon } from "aws-sdk/clients/eks";
import { off } from "process";

export const getSelectedLocationId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedLocationId");
  }
  return "";
};

export const getAddonsByLocationId = (
  selectedLocationId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  menusAddonCategories: MenusAddonCategories[],
  addons: Addons[]
) => {
  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) => item.menuId && item.locationId === Number(selectedLocationId)
    )
    .map((item) => item.menuId);
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menuId as number))
    .map((item) => item.addonCategoryId);
  return addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId as number)
  );
};

export const getLocationsByMenuCategoryId = (
  locations: Locations[],
  menuCategoryId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const validLocationIds = menusMenuCategoriesLocations
    .filter((item) => item.menuCategoryId === Number(menuCategoryId))
    .map((item) => item.locationId);
  return locations.filter((item) => validLocationIds.includes(item.id));
};

export const getMenusByMenuCategoryId = (
  menus: Menus[],
  menuCategoryId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  selectedLocationId: string
) => {
  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menuId &&
        item.menuCategoryId === Number(menuCategoryId) &&
        item.locationId === Number(selectedLocationId)
    )
    .map((item) => item.menuId);
  return menus.filter((item) => validMenuIds.includes(item.id));
};

export const getAddonCategoriesByMenuId = (
  menuId: string,
  menusAddonCategories: MenusAddonCategories[],
  addonCategories: AddonCategories[]
) => {
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => item.menuId === Number(menuId))
    .map((item) => item.addonCategoryId);
  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );
};

export const getAddonsByAddonCategoryId = (
  addonCategoryId: string,
  addons: Addons[]
) => {
  return addons.filter(
    (item) => item.addonCategoryId === Number(addonCategoryId)
  );
};

export const generateRandomId = () =>
  (Math.random() + 1).toString(36).substring(7);

export const getCartTotalPrice = (cart: CartItem[]) => {
  const totalPrice = cart.reduce((prev, curr) => {
    const menuPrice = curr.menu.price;
    const addonPrice = curr.addon.reduce((pre, cur) => (pre += cur.price), 0);
    prev += (menuPrice + addonPrice) * curr.quantity;
    return prev;
  }, 0);
  return totalPrice;
};

export const getSpecificActiveOrderPrice = (
  menuId: number,
  quantity: number,
  menus: Menus[],
  addons: Addons[],
  orderlines: Orderlines[],
  orders: Orders[],
  orderId: number
) => {
  const specificOrderlines = orderlines.filter(
    (item) => item.orderId === orderId
  );
  const menuPrice = menus.find((item) => item.id === menuId)?.price as number;
  const addonIds = specificOrderlines
    .filter((item) => item.menuId === menuId)
    .map((i) => i.addonId);
  const addonIdPrice = addons
    .filter((item) => addonIds.includes(item.id))
    .map((i) => i.price);
  let addonPrice = 0;
  addonPrice = addonIdPrice.reduce((prev, curr) => (prev += curr), 0);
  const rejectedMenu = orderlines.find(
    (item) =>
      item.menuId === menuId &&
      item.status === "REJECTED" &&
      orderId === item.orderId
  );
  if (rejectedMenu) {
    return 0;
  } else {
    return (menuPrice + addonPrice) * quantity;
  }
};

export const getMenuTotalPrice = (menu: CartItem) => {
  const menuPrice = menu.menu.price;
  const addonPrice = menu.addon.reduce((prev, curr) => (prev += curr.price), 0);
  const totalPrice = (menuPrice + addonPrice) * menu.quantity;
  return totalPrice;
};

export const getQrCodeUrl = (locationId: number, tableId: number) => {
  return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/foodie-pos/qrcode/msquare/locationId-${locationId}-tableId-${tableId}.png`;
};

export const getMenuCount = (orderId: number, orderlines: Orderlines[]) => {
  const respectiveOrderlinesMenu = orderlines
    .filter((item) => item.orderId === orderId)
    .map((item) => item.menuId) as number[];
  const uniqueMenuIds = [] as number[];
  respectiveOrderlinesMenu.forEach((menuId) => {
    const hasAdded = uniqueMenuIds.find((item) => item === menuId);
    if (!hasAdded) return uniqueMenuIds.push(menuId);
  });
  return uniqueMenuIds.length;
};

export const dataStatistics = (
  status: string,
  orders: Orders[],
  orderlines: Orderlines[],
  locationId: number
) => {
  if (status === "1") {
    const today = new Date();
    const startofDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const filteredOrders = orders.filter((item) => {
      const orderDate = new Date(item.updatedAt);
      return (
        orderDate >= startofDay &&
        orderDate <= endOfDay &&
        item.isPaid === true &&
        item.locationId === locationId
      );
    }) as Orders[];

    // total Revenue
    const totalRevenue = filteredOrders.reduce((prev, curr) => {
      prev += curr.price as number;
      return prev;
    }, 0);

    // total Dishes
    const uniqueOrderlines = [] as Orderlines[];
    const filteredOrderlines = orderlines.filter((orderline) => {
      const wantedOrdelines = filteredOrders.find(
        (order) => order.id === orderline.orderId
      );
      return wantedOrdelines;
    });

    filteredOrderlines.forEach((item) => {
      const notAdded = uniqueOrderlines.find((i) => i.itemId === item.itemId);
      if (!notAdded) uniqueOrderlines.push(item);
      return;
    });

    const totalDishes = uniqueOrderlines.reduce((prev, curr) => {
      prev += curr.quantity;
      return prev;
    }, 0);

    // total orders
    const totalOrdersCount = filteredOrders.reduce((prev, curr) => {
      if (curr) {
        prev += 1;
      }
      return prev;
    }, 0);

    return {
      revenue: totalRevenue,
      dishes: totalDishes,
      orders: totalOrdersCount,
    };
  } else if (status === "2") {
    const today = new Date();
    // Start and end of the week (Monday to Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday of the current week
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday of the current week

    const filteredOrders = orders.filter((item) => {
      const orderDate = new Date(item.updatedAt);
      return (
        orderDate >= startOfWeek &&
        orderDate <= endOfWeek &&
        item.isPaid === true &&
        item.locationId === locationId
      );
    }) as Orders[];

    // total Revenue
    const totalRevenue = filteredOrders.reduce((prev, curr) => {
      prev += curr.price as number;
      return prev;
    }, 0);

    // total Dishes
    const uniqueOrderlines = [] as Orderlines[];
    const filteredOrderlines = orderlines.filter((orderline) => {
      const wantedOrdelines = filteredOrders.find(
        (order) => order.id === orderline.orderId
      );
      return wantedOrdelines;
    });

    filteredOrderlines.forEach((item) => {
      const notAdded = uniqueOrderlines.find((i) => i.itemId === item.itemId);
      if (!notAdded) uniqueOrderlines.push(item);
      return;
    });

    const totalDishes = uniqueOrderlines.reduce((prev, curr) => {
      prev += curr.quantity;
      return prev;
    }, 0);

    // total orders
    const totalOrdersCount = filteredOrders.reduce((prev, curr) => {
      if (curr) {
        prev += 1;
      }
      return prev;
    }, 0);

    return {
      revenue: totalRevenue,
      dishes: totalDishes,
      orders: totalOrdersCount,
    };
  } else if (status === "3") {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the month

    const filteredOrders = orders.filter((item) => {
      const orderDate = new Date(item.updatedAt);
      return (
        orderDate >= startOfMonth &&
        orderDate <= endOfMonth &&
        item.isPaid === true &&
        item.locationId === locationId
      );
    }) as Orders[];

    // total Revenue
    const totalRevenue = filteredOrders.reduce((prev, curr) => {
      prev += curr.price as number;
      return prev;
    }, 0);

    // total Dishes
    const uniqueOrderlines = [] as Orderlines[];
    const filteredOrderlines = orderlines.filter((orderline) => {
      const wantedOrdelines = filteredOrders.find(
        (order) => order.id === orderline.orderId
      );
      return wantedOrdelines;
    });

    filteredOrderlines.forEach((item) => {
      const notAdded = uniqueOrderlines.find((i) => i.itemId === item.itemId);
      if (!notAdded) uniqueOrderlines.push(item);
      return;
    });

    const totalDishes = uniqueOrderlines.reduce((prev, curr) => {
      prev += curr.quantity;
      return prev;
    }, 0);

    // total orders
    const totalOrdersCount = filteredOrders.reduce((prev, curr) => {
      if (curr) {
        prev += 1;
      }
      return prev;
    }, 0);

    return {
      revenue: totalRevenue,
      dishes: totalDishes,
      orders: totalOrdersCount,
    };
  } else if (status === "4") {
    const today = new Date();

    const startOfYear = new Date(today.getFullYear(), 0, 1); // January 1st
    const endOfYear = new Date(today.getFullYear(), 11, 31); // December 31st

    const filteredOrders = orders.filter((item) => {
      const orderDate = new Date(item.updatedAt);
      return (
        orderDate >= startOfYear &&
        orderDate <= endOfYear &&
        item.isPaid === true &&
        item.locationId === locationId
      );
    }) as Orders[];

    // total Revenue
    const totalRevenue = filteredOrders.reduce((prev, curr) => {
      prev += curr.price as number;
      return prev;
    }, 0);

    // total Dishes
    const uniqueOrderlines = [] as Orderlines[];
    const filteredOrderlines = orderlines.filter((orderline) => {
      const wantedOrdelines = filteredOrders.find(
        (order) => order.id === orderline.orderId
      );
      return wantedOrdelines;
    });

    filteredOrderlines.forEach((item) => {
      const notAdded = uniqueOrderlines.find((i) => i.itemId === item.itemId);
      if (!notAdded) uniqueOrderlines.push(item);
      return;
    });

    const totalDishes = uniqueOrderlines.reduce((prev, curr) => {
      prev += curr.quantity;
      return prev;
    }, 0);

    // total orders
    const totalOrdersCount = filteredOrders.reduce((prev, curr) => {
      if (curr) {
        prev += 1;
      }
      return prev;
    }, 0);

    return {
      revenue: totalRevenue,
      dishes: totalDishes,
      orders: totalOrdersCount,
    };
  }
};

export const mostOrderedAnalysis = (
  status: string,
  orders: Orders[],
  orderlines: Orderlines[],
  menus: Menus[],
  locationId: number
) => {
  const today = new Date();
  const startofDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  // filter orders by locations & Payment
  const filteredOrders = orders.filter((item) => {
    const orderDate = new Date(item.updatedAt);
    return (
      orderDate >= startofDay &&
      orderDate <= endOfDay &&
      item.isPaid === true &&
      item.locationId === locationId
    );
  }) as Orders[];

  const uniqueOrderlines = [] as Orderlines[];
  // filter orderlines by orders
  const filteredOrderlines = orderlines.filter((orderline) =>
    filteredOrders.find((order) => {
      return orderline.orderId === order.id;
    })
  ) as Orderlines[];

  filteredOrderlines.forEach((orderline) => {
    const wantedOrderlines = uniqueOrderlines.find(
      (item) => item.itemId === orderline.itemId
    );
    if (!wantedOrderlines) uniqueOrderlines.push(orderline);
    return;
  });

  const menuIdWithQty = uniqueOrderlines.reduce((prev, curr) => {
    const found = prev.find((item) => item.menuId === curr.menuId);
    if (found) {
      found.quantity += curr.quantity;
    } else {
      prev.push({
        menuId: curr.menuId,
        menu: menus.find((mu) => mu.id === curr.menuId)?.name || "",
        quantity: curr.quantity,
      });
    }
    return prev;
  }, [] as MostOrdered[]);

  // console.log("here is the menuId with qty", menuIdWithQty);

  return menuIdWithQty as [];
};
