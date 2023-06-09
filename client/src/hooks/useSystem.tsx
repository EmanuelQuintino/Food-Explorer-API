import { PropsWithChildren, createContext, useState, useContext } from "react";

type IngredientsType = {
  id: string;
  name: string;
};

type FoodPlates = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  ingredients: IngredientsType[]
}[];

type PlateOrdersTypes = {
  id: string;
  amount: number;
};

type SystemContextType = {
  toggleMenu: () => void;
  menuActive: boolean;
  orderTotal: number;
  setOrderTotal: React.Dispatch<React.SetStateAction<number>>;
  updateOrderTotal: (userID: string) => void;
  removeOrderPlate: (userID: string) => void;
  isWaitPayment: boolean;
  setIsWaitPayment: React.Dispatch<React.SetStateAction<boolean>>;
  isPaymentConfirm: boolean;
  setIsPaymentConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth: number;
  setWindowWidth: React.Dispatch<React.SetStateAction<number>>;
  foodPlateWidth: number;
  setFoodPlateWidth: React.Dispatch<React.SetStateAction<number>>;
  filterFoodPlates: FoodPlates;
  setFilterFoodPlates: React.Dispatch<React.SetStateAction<FoodPlates>>;
  scrollToPlates: boolean;
  setScrollToPlates: React.Dispatch<React.SetStateAction<boolean>>;
  searchOrder: string;
  setSearchOrder: React.Dispatch<React.SetStateAction<string>>
  inputSearchPlatesValue: string;
  setInputSearchPlatesValue: React.Dispatch<React.SetStateAction<string>>
};

const SystemContext = createContext<SystemContextType>({} as SystemContextType);

export function SystemProvider({ children }: PropsWithChildren) {
  const [menuActive, setMenuActive] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [isWaitPayment, setIsWaitPayment] = useState(false);
  const [isPaymentConfirm, setIsPaymentConfirm] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [foodPlateWidth, setFoodPlateWidth] = useState(0);
  const [filterFoodPlates, setFilterFoodPlates] = useState<FoodPlates>([]);
  const [scrollToPlates, setScrollToPlates] = useState(false);
  const [searchOrder, setSearchOrder] = useState("");
  const [inputSearchPlatesValue, setInputSearchPlatesValue] = useState("");


  const toggleMenu = () => setMenuActive(menuActive ? false : true);

  function updateOrderTotal(userID: string) {
    const localStorageUserOrder = localStorage.getItem("@FoodExplorer:order");
    if (localStorageUserOrder) {
      const userOrder = JSON.parse(localStorageUserOrder);
      if (userOrder.userID !== userID || userOrder.plates.length === 0) {
        localStorage.removeItem("@FoodExplorer:order");
        setOrderTotal(0);
      } else {
        const amounts = userOrder.plates.map((plate: PlateOrdersTypes) => plate.amount);
        const sumAmounts = amounts.reduce((a: number, b: number) => a + b);
        setOrderTotal(sumAmounts);
      };
    };
  };

  function removeOrderPlate(plateID: string) {
    const localStorageUserOrder = localStorage.getItem("@FoodExplorer:order");
    if (localStorageUserOrder) {
      const userOrder = JSON.parse(localStorageUserOrder);
      const newUserOrder = {
        userID: userOrder.userID,
        plates: userOrder.plates.filter((plate: PlateOrdersTypes) => plate.id !== plateID)
      };

      localStorage.setItem("@FoodExplorer:order", JSON.stringify(newUserOrder));
      updateOrderTotal(newUserOrder.userID)
    };
  };

  return (
    <SystemContext.Provider value={{
      menuActive, toggleMenu,
      orderTotal, setOrderTotal,
      updateOrderTotal,
      removeOrderPlate,
      isWaitPayment, setIsWaitPayment,
      isPaymentConfirm, setIsPaymentConfirm,
      windowWidth, setWindowWidth,
      foodPlateWidth, setFoodPlateWidth,
      filterFoodPlates, setFilterFoodPlates,
      scrollToPlates, setScrollToPlates,
      searchOrder, setSearchOrder,
      inputSearchPlatesValue, setInputSearchPlatesValue,
    }}>
      {children}
    </SystemContext.Provider>
  )
}

export function useSystem() {
  return useContext(SystemContext);
}