import { Container } from "./style";
import { useAuth } from "../../hooks/useAuth";
import { SelectOrderStatus } from "../SelectOrderStatus";

type OrderPlatesTypes = {
  name?: string;
  amount?: number;
}

type UserOrderTypes = {
  id: string;
  code: number;
  status: string;
  date: string;
  plates: OrderPlatesTypes[];
}

export function TableRowHistoryOrders({ id, code, status, date, plates }: UserOrderTypes) {
  const { userAuth } = useAuth();
  const arrayPlates = plates.map((plate) => `${plate.amount} x ${plate.name}`);
  const stringPlates = arrayPlates.join(", ");

  const orderDataTime = new Date(date);

  const formatDate = orderDataTime.toLocaleString('pt-BR', {
    day: "numeric",
    month: "numeric",
    hour: "numeric",
    minute: "numeric"
  }).split(",").join(" às");

  return (
    <Container isAdmin={Boolean(userAuth.isAdmin)}>
      {!userAuth.isAdmin ?
        <td className="status">
          <i className={`statusIcon ${status}`}></i>
          {status}
        </td> :
        <td>
          <SelectOrderStatus id={id} status={status} />
        </td>
      }

      <td className="cod">{String(code).padStart(8, "0")}</td>

      <td className="plateDetails">
        {stringPlates}
      </td>

      <td className="date">{formatDate}</td>
    </Container >
  )
}
