import { useQuery } from "@tanstack/react-query";
import { API } from "../services/api";
import { useAuth } from "./useAuth";
import { useSystem } from "./useSystem";

type OrderPlatesTypes = {
  order_id: string;
  plate_id: string;
  amount: number;
  price: number;
};

type UserOrdersTypes = {
  data: {
    id: string;
    status: string;
    code: number;
    user_id: string;
    order_plates: OrderPlatesTypes[]
    created_at: string;
  }[];
};

export const useOrdersQuery = () => {
  const { userAuth } = useAuth();
  const { searchOrder } = useSystem();

  const URI = userAuth.isAdmin ?
    `/orders/index?search=${searchOrder}` :
    `/orders?search=${searchOrder}`;

  const query = useQuery({
    queryKey: ['userOrders'],
    queryFn: async () => await API.get(URI) as UserOrdersTypes
  });

  const refetchOrdersQuery = async () => await query.refetch();

  return {
    ...query,
    data: query.data?.data,
    refetchOrdersQuery
  };
};