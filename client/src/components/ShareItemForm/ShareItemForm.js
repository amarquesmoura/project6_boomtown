import React, { Component } from 'react';
import styles from './styles';
import { Form, Field, FormSpy } from 'react-final-form';
import { Link } from 'react-router-dom';
import { CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/ShareItemPreview/reducer';
import { connect } from 'react-redux';

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dispatchUpdate(values, tags, updateItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;
    return (
      <Form
        onSubmit={values => {
          this.saveItem(values, tags);
        }}
        render={() => {
          return (
            <form className={classes.formContainer}>
              <FormSpy
                subscription={{ values: true }}
                component={({ values }) => {
                  if (values) {
                    this.dispatchUpdate(values, tags, updateItem);
                  }
                  return '';
                }}
              />
              <div>
                <Typography variant="display2" className={classes.headline}>
                  Share. Borrow. Prosper.
                </Typography>
                <FormControl>
                  <Field>
                    {({ input, meta }) => {
                      return (
                        <Button
                          size="medium"
                          color="primary"
                          variant="contained"
                        >
                          <Typography>Select an Image</Typography>
                        </Button>
                      );
                    }}
                  </Field>
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="title">Wadawada</InputLabel>
                  <Field name="title">
                    {({ input, meta }) => <Input id="title" type="text" />}
                  </Field>
                </FormControl>
                <FormControl>
                  <Field name="description">
                    {({ input, meta }) => (
                      <TextField
                        id="description"
                        placeholder="Wadawada"
                        margin="normal"
                        multiline
                        rows="4"
                        rowsMax="4"
                      />
                    )}
                  </Field>
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="age-simple">Add some tags</InputLabel>
                  <Field name="tags" />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  Share
                </Button>
                <Button color="primary">Add Another Item</Button>
                <Button autoFocus color="secondary">
                  <Link to="/items">Back to Items Page</Link>
                </Button>
              </div>
            </form>
          );
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },
  resetItem() {
    dispatch(resetItem());
  },
  resetImage() {
    dispatch(resetImage());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareForm));
