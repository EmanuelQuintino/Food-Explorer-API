import { useMutation } from "@tanstack/react-query";
import { API } from "../services/api";
import { toast } from 'react-toastify';

type OrderPlatesTypes = {
  id: string;
  amount: number;
};

type OrderDataTypes = {
  userID: string;
  plates: OrderPlatesTypes[];
};

async function orderCreate(data: OrderDataTypes) {
  const orderPlates = data.plates.map((plate) => {
    return {
      plateID: plate.id,
      amount: plate.amount
    }
  });

  await API.post("/orders", orderPlates)
    .then((response) => toast.success(response.data || "Pedido realizado com sucesso"))
    .catch((error) => toast.error(error.response.data.error || "Erro ao fazer pedido"))
};

export const useOrderCreate = () => {
  const mutate = useMutation({
    mutationFn: orderCreate
  });

  return mutate;
};