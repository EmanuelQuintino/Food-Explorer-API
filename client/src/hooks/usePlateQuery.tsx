import { useQuery } from "@tanstack/react-query";
import { API } from "../services/api";

type IngredientsType = {
  id: string;
  name: string;
}

type FoodPlates = {
  data: {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
    ingredients: IngredientsType[]
  }[];
}

export const usePlateQuery = () => {
  const query = useQuery({
    queryKey: ['foodPlates'],
    queryFn: async () => await API.get("/plates") as FoodPlates
  });

  const refetchPlateQuery = async () => await query.refetch();

  return {
    ...query,
    data: query.data?.data,
    refetchPlateQuery
  }
} 