import { Container } from "./style";
import { API } from "../../services/api";
import { toast } from "react-toastify";
import { useOrdersQuery } from "../../hooks/useOrdersQuery";

type SelectTypes = {
  id: string;
  status: string;
}

export function SelectOrderStatus({ id, status, ...rest }: SelectTypes) {
  const { refetchOrdersQuery } = useOrdersQuery();

  async function handleUpdateStatus(event: React.ChangeEvent<HTMLSelectElement>, plateID: string) {
    try {
      await API.put(`/orders/${plateID}`, { status: event.target.value });
      await refetchOrdersQuery();
    } catch (error: any) {
      toast.error(error.response.data.error || "Erro ao atualizar status");
    };
  };

  return (
    <Container>
      <label htmlFor="OrderStatus" className="srOnly">Status do pedido</label>
      <i className={`statusIcon ${status}`}></i>
      <select id="OrderStatus" {...rest} value={status} onChange={(event) => handleUpdateStatus(event, id)}>
        <option value="Pendente">Pendente</option>
        <option value="Preparando">Preparando</option>
        <option value="Entregue">Entregue</option>
      </select>
    </Container>
  )
}
