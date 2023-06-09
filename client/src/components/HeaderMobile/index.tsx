import { HeaderContainer } from "./style";
import { MenuOpen } from "../../assets/MenuOpen";
import { MenuClose } from "../../assets/MenuClose";
import { IconExplorer } from "../../assets/IconExplorer";
import { OrderIcon } from "../../assets/OrderIcon";
import { MenuMobile } from "../MenuMobile";
import { useSystem } from "../../hooks/useSystem";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function HeaderMobile() {
  const { menuActive, toggleMenu, orderTotal, updateOrderTotal } = useSystem();
  const { userAuth } = useAuth();
  const navigate = useNavigate();

  function goToHome() {
    if (location.pathname === "/") return;
    navigate('/');
  };

  function goToShoppingCart() {
    if (location.pathname === "/shoppingcart") return;
    navigate('/shoppingcart');
  };

  useEffect(() => {
    updateOrderTotal(userAuth.id as string);
  }, [])

  return (
    <HeaderContainer menuActive={menuActive}>
      <div className="boxHeader">
        <button className="toggleMenu" onClick={toggleMenu}>
          {menuActive ?
            <MenuClose /> :
            <MenuOpen />
          }
        </button>

        {menuActive ?
          <h3>Menu</h3> :
          <>
            <div className="logo" onClick={goToHome}>
              <IconExplorer />
              <h1>food explorer</h1>
              {userAuth.isAdmin &&
                <p className="paragraphAdmin">admin</p>
              }
            </div>

            {!userAuth.isAdmin &&
              <div className="orderContainer">
                <button onClick={goToShoppingCart}>
                  <OrderIcon />
                  <div className="orderTotal">{orderTotal}</div>
                </button>
              </div>
            }
          </>
        }
      </div>
      {menuActive &&
        <MenuMobile />
      }
    </HeaderContainer>
  )
}