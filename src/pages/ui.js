import { BurgerLink, GradientButton, LineInput, Paragraph, TextLink, Title } from "../components/atoms";
import { AuthInput } from "../components/atoms/Input/AuthInput";
import { PensesBetes } from "../components/atoms/Text/PensesBetes";
import { Template } from "../components/molecules";

export default function Ui() {

  return (
    <Template>
      <Title>Inscription</Title>
      <BurgerLink href="/login">Accueil</BurgerLink>
      <Paragraph>Paragraph</Paragraph>
      <GradientButton>GradientButton</GradientButton>
      <PensesBetes />
      <AuthInput placeholder={"Adresse email"} />
      <LineInput placeholder={"Adresse email"} />
      <TextLink>S'inscrire</TextLink>
    </Template>
  );
}
