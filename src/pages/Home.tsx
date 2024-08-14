import { List, ListItem, ListItemText, styled } from "@mui/material";
import { H2 } from "../atoms/H2";
import { Thread } from "../type/Thread";
import { Page1Column } from "../templates/Page1Column";

interface HomeProps {
  threads: Thread[];
}

const SListItem = styled(ListItem)`
  text-align: center;
  border: 1px solid #ddd;
  border-top: none;
  transition: 0.1s;
  &:first-of-type {
    border-top: 1px solid #ddd;
  }
  &:hover {
    background-color: #66d48b;
    color: #fff;
  }
`;

export const Home: React.FC<HomeProps> = (props) => {
  const { threads } = props;
  return (
    <>
      <H2>新着スレッド</H2>
      <Page1Column>
        <List sx={{ borderCollapse: "collapse" }}>
          {threads.map((thread) => (
            <SListItem key={thread.id}>
              <ListItemText primary={thread.title} />
            </SListItem>
          ))}
        </List>
      </Page1Column>
    </>
  );
};
