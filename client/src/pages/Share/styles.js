const styles = theme => ({
  shareContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
    height: '100%',
    padding: 80,
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'center'
  },
  itemPreview: {
    maxWidth: 480,
    width: '50%',
    height: '100%',
    paddingLeft: 50,
    paddingRight: 0,
    paddingTop: 40
  },
  shareForm: {
    width: '50%',
    height: '100%',
    paddingLeft: 50,
    paddingRight: 50
  }
});

export default styles;
