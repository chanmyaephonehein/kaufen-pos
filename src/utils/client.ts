export const getSelectedLocationId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedLocationId");
  }
  return "";
};
