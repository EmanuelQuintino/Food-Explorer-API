import { HeaderContainer } from "./style";
import { IconExplorer } from "../../assets/IconExplorer";
import { OrderIcon } from "../../assets/OrderIcon";
import { InputSearchPlate } from "../InputSearchPlate";
import { useSystem } from "../../hooks/useSystem";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { LogoutIcon } from "../../assets/LogoutIcon";

export function HeaderDesktop() {
  const { orderTotal, updateOrderTotal } = useSystem();
  const { userAuth } = useAuth();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  function goToHome() {
    if (location.pathname === "/") return;
    navigate('/');
  };

  function goToNewPlate() {
    if (location.pathname === "/newplate") return;
    navigate('/newplate');
  };

  function goToFovorites() {
    if (location.pathname === "/favorites") return;
    navigate('/favorites');
  };

  function goToOrderHistory() {
    if (location.pathname === "/orderhistory") return;
    navigate('/orderhistory');
  };

  function logout() {
    const isConfirmLogout = confirm('Deseja sair da aplicação?');
    if (isConfirmLogout) {
      navigate('/');
      handleLogout()
    };
  };

  function goToShoppingCart() {
    if (location.pathname === "/shoppingcart") return;
    navigate('/shoppingcart');
  };

  useEffect(() => {
    updateOrderTotal(userAuth.id as string);
  }, [])

  return (
    <HeaderContainer>
      <div className="boxHeader">
        <div className="logo" onClick={goToHome}>
          <IconExplorer />
          <h1>food explorer</h1>
          {userAuth.isAdmin &&
            <p className="paragraphAdmin">admin</p>
          }
        </div>

        <InputSearchPlate />

        <div className="boxButtons">
          {userAuth.isAdmin && <button onClick={goToNewPlate}>Novo Prato</button>}
          <button onClick={goToFovorites}>Meus favoritos</button>
          <button onClick={goToOrderHistory}>Histórico de pedidos</button>
        </div>

        <div className="orderContainer" onClick={goToShoppingCart}>
          <Button
            icon={OrderIcon}
            name={`Pedido (${orderTotal})`}
          />
        </div>

        <button className="logoutIconButton" onClick={logout}>
          <LogoutIcon />
        </button>
      </div>
    </HeaderContainer>
  )
}