const styles = theme => ({
  logoButton: {
    marginLeft: -12,
    marginRight: 20,
    width: '40px'
  },
  logo: {
    maxWidth: '100%'
  },
  flex: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginRight: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    background: theme.palette.primary.main,
    borderRadius: '200px'
  },
  shareicon: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing.unit
  }
});

export default styles;
