import * as React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Card as MuiCard,
  CardContent,
  CardMedia,
  Tooltip,
} from '@material-ui/core';

interface Props {
  src: string;
  title: string;
}

const useStyles = makeStyles<Theme>(() =>
  createStyles({
    img: {
      width: 'auto',
    },
  }),
);
const Card: React.FC<Props> = React.memo(function Card({
  src,
  children,
  title,
}) {
  const classes = useStyles();

  return (
    <Tooltip placement="top" title={title}>
      <MuiCard className={classes.card}>
        <CardMedia
          component="img"
          height="140"
          src={src}
          classes={{ media: classes.img }}
        />
        <CardContent>{children}</CardContent>
      </MuiCard>
    </Tooltip>
  );
});

export default Card;
