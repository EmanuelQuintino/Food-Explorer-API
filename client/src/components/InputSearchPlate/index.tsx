import { Container } from "./style";
import { SearchIcon } from "../../assets/SearchIcon"
import { useSystem } from "../../hooks/useSystem";
import { usePlateQuery } from "../../hooks/usePlateQuery";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type IngredientsType = {
  id: string;
  name: string;
}

type FoodPlates = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  ingredients: IngredientsType[];
}

export function InputSearchPlate() {
  const {
    menuActive, toggleMenu,
    setFilterFoodPlates,
    setScrollToPlates,
    inputSearchPlatesValue, setInputSearchPlatesValue,
  } = useSystem();

  const [filterPlates, setFilterPlates] = useState<FoodPlates[]>();
  const plateQuery = usePlateQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (inputSearchPlatesValue.length > 0) {
      const filter = plateQuery.data?.filter((plate) => {
        const ingredientsName = plate.ingredients.map(ingredient => ingredient.name);
        return (
          String(plate.name).toLowerCase().includes(inputSearchPlatesValue.toLowerCase()) ||
          String(ingredientsName).toLowerCase().includes(inputSearchPlatesValue.toLowerCase())
        );
      });

      setFilterPlates(filter);
    } else {
      if (plateQuery.data) setFilterFoodPlates(plateQuery.data);
    };
  }, [plateQuery.data, inputSearchPlatesValue]);

  useEffect(() => {
    if (inputSearchPlatesValue.length === 0) {
      if (plateQuery.data) setFilterFoodPlates(plateQuery.data);
    };
  }, [inputSearchPlatesValue]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (filterPlates) setFilterFoodPlates(filterPlates);

    menuActive ? toggleMenu() : "";
    setScrollToPlates(true);

    if (location.pathname === "/") return;
    navigate('/');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputSearch" className="srOnly">Input Search</label>
        <SearchIcon />
        <input
          type="text"
          name="inputSearch"
          id="inputSearch"
          placeholder="Busque por pratos ou ingredientes"
          value={inputSearchPlatesValue}
          onChange={(event) => setInputSearchPlatesValue(event.target.value)}
        />
      </form>
    </Container>
  )
}