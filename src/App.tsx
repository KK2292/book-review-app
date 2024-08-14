import { Header } from "./molecules/Header";

export const App = () => {
  fetch("railway.bulletinboard.techtrain.dev").then((response) => {
    console.log(response);
  });

  return (
    <>
      <Header />
    </>
  );
};
