import { Container } from "./style";
import { MinusIcon } from "../../assets/MinusIcon";
import { PlusIcon } from "../../assets/PlusIcon";
import { Button } from "../Button";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useSystem } from "../../hooks/useSystem";

type PlateTypes = {
  id: string;
  name?: string;
  price?: string;
}

export type ButtonType = {
  plate: PlateTypes;
  iconButton?: React.FC<React.SVGProps<SVGSVGElement>>;
  nameButton: string;
}

export function CountOrderPlate({ plate, iconButton, nameButton }: ButtonType) {
  const [countPlate, setCountPlate] = useState(1);
  const { userAuth } = useAuth();
  const { updateOrderTotal, isPaymentConfirm, setIsPaymentConfirm } = useSystem();

  const platePlus = () => setCountPlate(previousState => Math.min(previousState + 1, 9));
  const plateMinus = () => setCountPlate(previousState => Math.max(previousState - 1, 1));

  function includeUserOrderPlate() {
    if (isPaymentConfirm) {
      localStorage.removeItem("@FoodExplorer:order");
      setIsPaymentConfirm(false);
    };

    const newUserOrder = {
      userID: userAuth.id,
      plates: [{ id: plate.id, amount: countPlate }]
    };

    const localStorageUserOrder = localStorage.getItem("@FoodExplorer:order");

    if (!localStorageUserOrder) {
      localStorage.setItem("@FoodExplorer:order", JSON.stringify(newUserOrder));
    } else {
      const userOrder = JSON.parse(localStorageUserOrder);
      if (userOrder.userID !== userAuth.id) localStorage.removeItem("@FoodExplorer:order");

      const plateIndex = userOrder.plates.findIndex((plateOrder: PlateTypes) => plateOrder.id === plate.id);
      if (plateIndex !== -1) {
        userOrder.plates[plateIndex].amount += countPlate;
      } else {
        userOrder.plates.push(newUserOrder.plates[0]);
      };

      localStorage.setItem("@FoodExplorer:order", JSON.stringify(userOrder));
    };
    updateOrderTotal(userAuth.id as string);
  };

  return (
    <Container>
      <section className="containerCountOrderPlate">
        <div className="boxMinusPlus">
          <button onClick={plateMinus}>
            <MinusIcon />
          </button>

          <p>{String(countPlate).padStart(2, "0")}</p>

          <button onClick={platePlus}>
            <PlusIcon />
          </button>
        </div>

        <div className="boxButton">
          <Button name={nameButton} icon={iconButton} onClick={includeUserOrderPlate} />
        </div>
      </section>
    </Container>
  )
}