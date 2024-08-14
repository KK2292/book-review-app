import { Link } from "react-router-dom";
import { H2 } from "./atoms/H2";

export const Page404: React.FC = () => {
  return (
    <>
      <H2>
        ページが見つかりませんでした
      </H2>
      <Link to="/">ホームに戻る</Link>
    </>
  );
};
