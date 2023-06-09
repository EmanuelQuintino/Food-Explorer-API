import { useQuery } from "@tanstack/react-query";
import { API } from "../services/api";
import { AxiosPromise } from "axios";

type OrderPlateTypes = {
  id: string;
  order_id: string;
  plate_id: string;
  created_at: string;
  updated_at: string;
}

type OrderTypes = {
  id: string;
  status: string;
  users_id: string;
  created_at: string;
  updated_at: string;
  order_plates: OrderPlateTypes[]
}

type FavoriteTypes = {
  user_id: string;
  plate_id: string;
  created_at: string;
  updated_at: string;
}

type UserDataTypes = {
  id: string;
  name: string;
  email: string;
  orders: OrderTypes[];
  favorites: FavoriteTypes[];
}

export const useQueryUser = () => {
  const query = useQuery({
    queryKey: ['userData'],
    queryFn: async (): AxiosPromise<UserDataTypes> => await API.get<UserDataTypes>("/users")
  });

  const refetchQueryUser = async () => await query.refetch();

  return {
    ...query,
    data: query.data?.data,
    refetchQueryUser
  }
} 