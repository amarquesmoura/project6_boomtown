const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  longItem: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  shortItem: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 20,
    width: 100
  },
  heading: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  }
});

export default styles;
