import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Theme, theme } from '../theme';
import { IconType } from '../data/iconData';
import Icon from '@material-ui/core/Icon';
import { CardContent, Card, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: 4
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

interface IconResultProps {
  icon: IconType
}

const IconResult: React.FC<IconResultProps> = (props: IconResultProps) => {
  const { icon } = props;
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Icon fontSize="large">{icon.name}</Icon>
        <Typography variant='caption'>
          {icon.name}
        </Typography>
      </CardContent>
    </Card>

  );
}

export default IconResult;
