import { Link } from "react-router-dom";
import { PageTitle } from "./atoms/PageTitle";

export const Page404: React.FC = () => {
  return (
    <>
      <PageTitle>ページが見つかりませんでした</PageTitle>
      <Link to="/">ホームに戻る</Link>
    </>
  );
};
