import { Box, Container, List, ListItemText, Typography } from '@mui/material';
import { Work } from '@prisma/client';
import { useEffect } from 'react';
import { useContentContext } from '../_app';

const Works = () => {
  const authors = useContentContext();
  const works = authors?.reduce((accum, author) => ([ ...accum, ...author.works]), [] as Work[]);

  return (
    <Container>
      <Box sx={{ my: 6, marginX: 10 }}>
        {works &&
          works?.map(({ title, medium }, i) => (
            <Typography key={i} color="text.primary">
              {title}, {medium}
            </Typography>
          ))}
      </Box>
    </Container>
  );
};

export default Works;
