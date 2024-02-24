import { Typography } from '@mui/material';

const Work = () => {
  //   const authors = useContentContext();
  //   const works = authors?.reduce(
  //     (accum, author) => [...accum, ...author.works],
  //     [] as Work[]
  //   );

  return [...new Array(12)].map((_, i) => (
    <Typography key={i} paragraph color="text.primary">
      `Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
      dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
      consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
      scelerisque nisl consectetur et.`
    </Typography>
  ));
};

export default Work;
