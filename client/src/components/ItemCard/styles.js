const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  itemCardGravatarImage: {
    borderRadius: '50%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  itemTitle: {
    fontWeight: 600
  },
  borrow: {
    marginBottom: theme.spacing.unit * 1.5
  }
});

export default styles;
