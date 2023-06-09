import { Container } from "./style"
import { LogoHome } from "../../components/LogoHome"
import { FoodPlate } from "../../components/FoodPlate"
import { useSystem } from "../../hooks/useSystem"
import { ImSpinner2 } from "react-icons/im";
import { useQueryUser } from "../../hooks/useQueryUser";
import { useEffect, useRef } from "react";
import { NextIcon } from "../../assets/NextIcon";
import { PreviousIcon } from "../../assets/PreviousIcon";
import { usePlateQuery } from "../../hooks/usePlateQuery";

export function Home() {
  const {
    menuActive,
    foodPlateWidth,
    windowWidth,
    filterFoodPlates,
    scrollToPlates, setScrollToPlates
  } = useSystem();

  const userData = useQueryUser();
  const plateQuery = usePlateQuery();

  const carouselMeals: React.RefObject<HTMLDivElement> = useRef(null);
  const carouselDesserts: React.RefObject<HTMLDivElement> = useRef(null);
  const carouselDrinks: React.RefObject<HTMLDivElement> = useRef(null);
  const platesRefToScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToPlates && platesRefToScroll.current) {
      platesRefToScroll.current.scrollIntoView();
      setScrollToPlates(false);
    }
  }, [scrollToPlates]);

  const arrayMeals = filterFoodPlates.filter(plate => plate.category === "Refeições");
  const arrayDesserts = filterFoodPlates.filter(plate => plate.category === "Sobremesas");
  const arrayDrinks = filterFoodPlates.filter(plate => plate.category === "Bebidas");

  function handlePrevCarouselMeals(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (carouselMeals.current) carouselMeals.current.scrollLeft -= foodPlateWidth;
  };

  function handleNextCarouselMeals(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (carouselMeals.current) carouselMeals.current.scrollLeft += foodPlateWidth;
  };

  function handlePrevCarouselDesserts(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (carouselDesserts.current) carouselDesserts.current.scrollLeft -= foodPlateWidth;
  };

  function handleNextCarouselDesserts(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (carouselDesserts.current) carouselDesserts.current.scrollLeft += foodPlateWidth;
  };

  function handlePrevCarouselDrinks(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (carouselDrinks.current) carouselDrinks.current.scrollLeft -= foodPlateWidth;
  };

  function handleNextCarouselDrinks(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (carouselDrinks.current) carouselDrinks.current.scrollLeft += foodPlateWidth;
  };

  return (
    <Container>
      {!menuActive &&
        <>
          <LogoHome />

          <span ref={platesRefToScroll}></span>

          {plateQuery.isLoading || userData.isLoading ? <p><ImSpinner2 className="spinner" /></p> : null}
          {plateQuery.error || userData.error ? <p className="queryError">Algo deu errado!</p> : null}

          {filterFoodPlates && filterFoodPlates.length === 0 ?
            <p className="messageEmptyList">Lista de pratos vazia</p> :
            <>
              <section className="ContainerBoxPlates">
                {arrayMeals && arrayMeals.length > 0 &&
                  <>
                    <h2>Refeições</h2>
                    <div className="boxPlates">
                      <div className="plates" ref={carouselMeals}>
                        {arrayMeals.map(plate => {
                          return (
                            <FoodPlate
                              key={plate.id}
                              plate={plate}
                              isFavorite={userData.data?.favorites.map(plate => plate.plate_id).includes(plate.id)}
                            />
                          )
                        })}
                      </div>

                      {carouselMeals.current &&
                        carouselMeals.current?.offsetWidth / foodPlateWidth < arrayMeals.length &&
                        windowWidth > 640 &&
                        <>
                          <div className="shadowPrev"></div>
                          <button onClick={handlePrevCarouselMeals} className="buttonPrev">
                            <PreviousIcon />
                          </button>

                          <div className="shadowNext"></div>
                          <button onClick={handleNextCarouselMeals} className="buttonNext">
                            <NextIcon />
                          </button>
                        </>
                      }
                    </div>
                  </>
                }
              </section>

              <section className="ContainerBoxPlates">
                {arrayDesserts && arrayDesserts.length > 0 &&
                  <>
                    <h2>Sobremesas</h2>
                    <div className="boxPlates">
                      <div className="plates" ref={carouselDesserts}>
                        {arrayDesserts.map(plate => {
                          return (
                            <FoodPlate
                              key={plate.id}
                              plate={plate}
                              isFavorite={userData.data?.favorites.map(plate => plate.plate_id).includes(plate.id)}
                            />
                          )
                        })}
                      </div>

                      {carouselDesserts.current &&
                        carouselDesserts.current?.offsetWidth / foodPlateWidth < arrayDesserts.length &&
                        windowWidth > 640 &&
                        <>
                          <div className="shadowPrev"></div>
                          <button onClick={handlePrevCarouselDesserts} className="buttonPrev">
                            <PreviousIcon />
                          </button>

                          <div className="shadowNext"></div>
                          <button onClick={handleNextCarouselDesserts} className="buttonNext">
                            <NextIcon />
                          </button>
                        </>
                      }
                    </div>
                  </>
                }
              </section>

              <section className="ContainerBoxPlates">
                {arrayDrinks && arrayDrinks.length > 0 &&
                  <>
                    <h2>Bebidas</h2>
                    <div className="boxPlates">
                      <div className="plates" ref={carouselDrinks}>
                        {arrayDrinks.map(plate => {
                          return (
                            <FoodPlate
                              key={plate.id}
                              plate={plate}
                              isFavorite={userData.data?.favorites.map(plate => plate.plate_id).includes(plate.id)}
                            />
                          )
                        })}
                      </div>

                      {carouselDrinks.current &&
                        carouselDrinks.current?.offsetWidth / foodPlateWidth < arrayDrinks.length &&
                        windowWidth > 640 &&
                        <>
                          <div className="shadowPrev"></div>
                          <button onClick={handlePrevCarouselDrinks} className="buttonPrev">
                            <PreviousIcon />
                          </button>

                          <div className="shadowNext"></div>
                          <button onClick={handleNextCarouselDrinks} className="buttonNext">
                            <NextIcon />
                          </button>
                        </>
                      }
                    </div>
                  </>
                }
              </section>
            </>
          }
        </>
      }
    </Container >
  )
}