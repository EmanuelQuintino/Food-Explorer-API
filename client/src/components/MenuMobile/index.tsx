import { Container } from "./style";
import { InputSearchPlate } from "../InputSearchPlate";
import { useAuth } from "../../hooks/useAuth";
import { useSystem } from "../../hooks/useSystem";
import { useNavigate } from "react-router-dom";

export function MenuMobile() {
  const { handleLogout } = useAuth();
  const { toggleMenu } = useSystem();
  const navigate = useNavigate();
  const { userAuth } = useAuth();

  function goToHome() {
    toggleMenu();
    if (location.pathname === "/") return;
    navigate('/');
  };

  function goToNewPlate() {
    toggleMenu();
    if (location.pathname === "/newplate") return;
    navigate('/newplate');
  };

  function goToFovorites() {
    toggleMenu();
    if (location.pathname === "/favorites") return;
    navigate('/favorites');
  };

  function goToOrderHistory() {
    toggleMenu();
    if (location.pathname === "/orderhistory") return;
    navigate('/orderhistory');
  };

  function logout() {
    const isConfirmLogout = confirm('Deseja sair da aplicação?');
    if (isConfirmLogout) {
      navigate('/');
      toggleMenu();
      handleLogout()
    };
  };

  return (
    <Container>
      <InputSearchPlate />
      <div className="boxButtons">
        <button onClick={goToHome}>Home</button>
        {userAuth.isAdmin && <button onClick={goToNewPlate}>Novo Prato</button>}
        <button onClick={goToFovorites}>Meus favoritos</button>
        <button onClick={goToOrderHistory}>Histórico de pedidos</button>
        <button onClick={logout}>Sair</button>
      </div>
    </Container>
  )
}