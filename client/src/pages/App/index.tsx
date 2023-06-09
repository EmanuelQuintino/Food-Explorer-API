import { Container } from "./style";
import { HeaderMobile } from "../../components/HeaderMobile";
import { HeaderDesktop } from "../../components/HeaderDesktop";
import { Outlet } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { useSystem } from "../../hooks/useSystem";
import { useEffect } from "react";

export function App() {
  const { windowWidth, setWindowWidth } = useSystem();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <Container>
      <header>
        {windowWidth > 670 ? <HeaderDesktop /> : <HeaderMobile />}
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </Container>
  )
}