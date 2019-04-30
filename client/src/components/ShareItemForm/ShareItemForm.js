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
    this.fileInput = React.createRef();
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    };
  }

  handleSelectTags = event => {
    this.setState({
      selectedTags: event.target.value
    });
  };

  handleSelectFile = event => {
    this.setState({
      fileSelected: this.fileInput.current.files[0]
    });
  };

  // convert array into array of objects
  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  resetFileInput = () => {
    this.fileInput.current.value = '';
    this.props.resetImage();
    this.setState({
      fileSelected: false
    });
  };

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
    const { classes, tags } = this.props;
    return (
      <Form
        onSubmit={values => {
          this.saveItem(values, tags);
        }}
        render={({ handleSubmit, pristine, invalid, form }) => {
          return (
            <form onSubmit={handleSubmit} className={classes.formContainer}>
              <FormSpy
                subscription={{ values: true }}
                component={({ values }) => {
                  if (values) {
                    this.dispatchUpdate(values, tags, updateItem);
                  }
                  return '';
                }}
              />
              <Typography variant="display2" className={classes.headline}>
                Share. Borrow. Prosper.
              </Typography>
              <Button
                onClick={this.triggerInputFile}
                variant="contained"
                className={classes.button}
              >
                SELECT AN IMAGE
              </Button>
              <input
                hidden
                ref={this.fileInput}
                onChange={e => this.handleSelectFile(e)}
                type="file"
                name="imageSelect"
                id="imageSelect"
              />
              <Field />
              <FormControl>
                <Field>
                  {({ input, meta }) => {
                    return (
                      <Button size="medium" color="primary" variant="contained">
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
