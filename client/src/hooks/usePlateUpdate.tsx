import { useMutation } from "@tanstack/react-query";
import { API } from "../services/api";
import { toast } from 'react-toastify';

type Ingredient = {
  name: string;
};

type FoodPlates = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  ingredients: Ingredient[]
};

async function updatePlate(data: FoodPlates) {
  const plateData = {
    ...data,
    price: data.price.replace("R$ ", ""),
    ingredients: data.ingredients.map(ingredient => ingredient.name),
    image: data.image[0],
  };

  const formData = new FormData();

  formData.append('name', plateData.name);
  formData.append('image', plateData.image);
  formData.append('price', plateData.price);
  formData.append('category', plateData.category);
  formData.append('ingredients', JSON.stringify(plateData.ingredients));
  formData.append('description', plateData.description);

  await API.put(`/plates/${plateData.id}`, formData)
    .then((response) => toast.success(response.data || "Prato atualizado com sucesso"))
    .catch((error) => toast.error(error.response?.data?.error || "Erro ao atualizar prato"))
};

export const usePlateUpdate = () => {
  const mutate = useMutation({
    mutationFn: updatePlate
  });

  return mutate;
} 