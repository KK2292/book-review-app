import { styled } from "@mui/material";

export const ValidationMessage = (props: { children: string }) => {
  const { children } = props;

  const Sp = styled("p")`
    color: rgb(211, 47, 47);
    font-size: 14px;
    margin: 0 0 16px;
    text-align: left;
  `;

  return <Sp>{children}</Sp>;
};
