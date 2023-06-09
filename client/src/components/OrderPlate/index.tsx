import { Container } from "./style";
import { API } from "../../services/api";
import { useSystem } from "../../hooks/useSystem";

type OrderPlateTypes = {
  orderPlate: {
    id: string;
    name?: string;
    image?: string;
    price?: string;
    amount: number;
  };
};

export function OrderPlate({ orderPlate }: OrderPlateTypes) {
  const { removeOrderPlate } = useSystem();

  const imageURL = `${API.defaults.baseURL}/images/${orderPlate.image}`;

  return (
    <Container>
      <img src={orderPlate.image && imageURL} alt="image-plate" className="imagePlate" />
      <div className="box">
        <div className="plateNamePrice">
          <h3 className="plateName">
            {orderPlate.amount}x {orderPlate.name}
          </h3>

          <div className="platePrice">
            {Number(orderPlate.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
        </div>

        <button className="removeOrderPlate" onClick={() => removeOrderPlate(orderPlate.id)}>
          Excluir
        </button>
      </div>
    </Container>
  )
}
