import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Button,
  ListItem,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: 'auto',
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

interface Props {
  className?: string;
  href?: string;
  onClick?: () => void;
  icon: any;
  title: string;
  [key: string]: any;
}

const NavItem = ({
  className,
  href,
  onClick,
  icon: Icon,
  title,
  ...rest
}: Props) => {
  const classes = useStyles();

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      {href ? (
        <Button
          activeClassName={classes.active}
          className={classes.button}
          component={RouterLink}
          to={href}
        >
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
        </Button>
      ) : (
        <Button className={classes.button} onClick={onClick}>
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
        </Button>
      )}
    </ListItem>
  );
};

export default NavItem;
