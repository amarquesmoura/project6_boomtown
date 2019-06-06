const styles = theme => ({
  root: {
    backgroundColor: '#212121',
    width: '100%',
    height: '120vh',
    display: 'flex',
    justifyContent: 'center'
  },
  profile: {
    height: 250,
    backgroundColor: 'white',
    marginTop: 80,
    flexBasis: '100%',
    maxWidth: '90%'
  },
  container: {
    padding: 50
  },
  header: {
    display: 'flex',
    marginBottom: 10
  },
  gravatar: {
    borderRadius: '50%'
  },
  name: {
    marginLeft: 10,
    lineHeight: 'normal'
  },
  shareitem: {
    fontSize: 35,
    color: '#f9a825',
    backgroundColor: '#212121',
    paddingTop: 50
  },
  items: {
    marginBottom: 100
  },
  shareitemContainer: {
    width: '100%'
  }
});

export default styles;
