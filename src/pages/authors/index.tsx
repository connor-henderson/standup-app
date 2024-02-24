import { Box, Container, List, ListItemText, Typography } from '@mui/material';
import { useContentContext } from '../_app';

const Authors = () => {
  const authors = useContentContext();

  return (
    authors &&
    authors?.map((author) => (
      <Container>
        <Box sx={{ my: 6, marginX: 10 }}>
          <Typography key={author.name} paragraph color="text.primary">
            <List>
              <ListItemText>{author.name}</ListItemText>
              <ListItemText>{author.website}</ListItemText>
              <ListItemText>{author.bio}</ListItemText>
              <br />
            </List>
          </Typography>
        </Box>
      </Container>
    ))
  );
};

export default Authors;
