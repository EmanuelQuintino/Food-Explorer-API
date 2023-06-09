import { Container } from "./style";
import { API } from "../../services/api";
import { toast } from "react-toastify";
import { useQueryUser } from "../../hooks/useQueryUser";
import { useNavigate } from "react-router-dom";

type FavoritePlateType = {
  plate?: {
    id: string;
    name: string;
    image: string;
  }
};

export function FavoritePlate({ plate }: FavoritePlateType) {
  const { refetchQueryUser } = useQueryUser();
  const navigate = useNavigate();

  const imageURL = `${API.defaults.baseURL}/images/${plate?.image}`;

  async function unFavorite(plateID: string): Promise<void> {
    try {
      await API.delete(`/favorites/${plateID}`);
      await refetchQueryUser();
    } catch (error: any) {
      toast.error(error.response.data.error || "Erro ao remover prato dos favoritos");
    };
  };

  const goToPlateDetails = () => navigate(`/details/${plate?.id}`);

  return (
    <Container>
      <img src={imageURL} alt="image-plate" className="imagePlate" />
      <div className="box">
        <button className="namePlateButton" onClick={goToPlateDetails}>
          {plate?.name} &gt;
        </button>

        <button className="removeFavoriteButton" onClick={() => unFavorite(plate!.id)}>
          remover dos favoritos
        </button>
      </div>
    </Container>
  )
}
