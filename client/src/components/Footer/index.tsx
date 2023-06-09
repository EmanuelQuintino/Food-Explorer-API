import { FooterContainer } from "./style";
import { IconExplorer } from "../../assets/IconExplorer";

export function Footer() {
  return (
    <FooterContainer>
      <div className="logoBox">
        <IconExplorer />
        <h1>food explorer</h1>
      </div>

      <p>&copy; 2023 - Todos os direitos reservados.</p>
    </FooterContainer>
  )
}