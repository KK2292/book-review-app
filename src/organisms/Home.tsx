import { List, ListItem, ListItemText, styled } from "@mui/material";
import { PageTitle } from "../atoms/PageTitle";
import { Page1Column } from "../templates/Page1Column";
import { Thread } from "../type/Thread";

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
      <PageTitle>新着スレッド</PageTitle>
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
