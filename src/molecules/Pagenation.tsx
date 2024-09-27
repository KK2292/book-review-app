import { Button, ButtonGroup, Typography } from "@mui/material";

export const Pagenation = (props: {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}) => {
  const { currentPage, setCurrentPage } = props;
  const onClickPreviousPage = () => {
    if (currentPage === 0) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };
  const onClickNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <>
      <Typography>{currentPage + 1}ページ目</Typography>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button
          sx={{
            color: "#fff",
          }}
          onClick={onClickPreviousPage}
        >
          前へ
        </Button>

        <Button
          sx={{
            color: "#fff",
          }}
          onClick={onClickNextPage}
        >
          次へ
        </Button>
      </ButtonGroup>
    </>
  );
};
