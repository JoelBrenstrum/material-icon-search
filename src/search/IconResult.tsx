import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Theme, theme } from '../theme';
import { IconType } from '../data/iconData';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    
  },
}));

interface IconResultProps {
  icon: IconType
}

const IconResult: React.FC<IconResultProps> = (props: IconResultProps) => {
  const {icon} = props;
  const classes = useStyles();
  return (
      <Icon>{icon.name}</Icon>
  );
}

export default IconResult;
