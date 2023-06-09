import { Container } from "./style";
import { CredCardIcon } from "../../assets/CredCardIcon";
import { PixIcon } from "../../assets/PixIcon";
import { QRCodeExplorer } from "../../assets/QRCodeExplorer";
import { useState } from "react";
import { FormPayment } from "../FormPayment";
import { ApprovedIcon } from "../../assets/ApprovedIcon";
import { useSystem } from "../../hooks/useSystem";
import { ClockTimeIcon } from "../../assets/ClockTimeIcon";

export function TablePayment() {
  const [paymentForm, setPaymentForm] = useState("pix");
  const { isWaitPayment, isPaymentConfirm } = useSystem();

  function pixPaymentForm() {
    setPaymentForm("pix");
  }

  function credCardPaymentForm() {
    setPaymentForm("credCard");
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th className={paymentForm === "pix" ? "paymentActive" : ""} onClick={pixPaymentForm}>
              <PixIcon />
              PIX
            </th>
            <th className={paymentForm === "credCard" ? "paymentActive" : ""} onClick={credCardPaymentForm}>
              <CredCardIcon />
              Crédito
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {paymentForm === "pix" &&
                <div className="qrCodeExplorerIcon">
                  <QRCodeExplorer />
                </div>
              }

              {paymentForm === "credCard" &&
                <>
                  {!isPaymentConfirm ?
                    (!isWaitPayment ?
                      <FormPayment /> :
                      <div className="boxPaymentApproved">
                        <ClockTimeIcon />
                        <p>Aguardando pagamento...</p>
                      </div>
                    ) :
                    <div className="boxPaymentApproved">
                      <ApprovedIcon />
                      <p>Pagamento aprovado!</p>
                    </div>
                  }
                </>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}