const styles = theme => ({
  root: {
    display: 'flex'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  button: {
    marginBottom: theme.spacing.unit
  }
});

export default styles;
