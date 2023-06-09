import { Container } from "./style";

export function LogoHome() {
  return (
    <Container>
      <div className="box">
        <div>
          <img src="images/rectangle.png" alt="rectangle" className="rectangle" />
          <img src="images/macaron.png" alt="macaron.png" className="macaronLogo" />
        </div>
        <div className="slogan">
          <h2>Sabores inigualáveis</h2>
          <p>Sinta o cuidado do preparo com ingredientes selecionados.</p>
        </div>
      </div>
    </Container>
  )
}