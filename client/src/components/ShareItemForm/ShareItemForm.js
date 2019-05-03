import React, { Component } from 'react';
import styles from './styles';
import { Form, Field, FormSpy } from 'react-final-form';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/ShareItemPreview/reducer';
import { connect } from 'react-redux';
import { ADD_ITEM_MUTATION } from '../../apollo/queries';

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

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

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
    const { classes, tags, updateItem } = this.props;
    const ITEM_PADDING_TOP = 8;
    const ITEM_HEIGHT = 48;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250
        }
      }
    };

    return (
      <Form
        onSubmit={values => {
          this.saveItem(values, tags, addItem);
        }}
        render={({ handleSubmit, pristine, invalid, form, values }) => {
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
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="title" />
                <Field name="title">
                  {({ input, meta }) => (
                    <Input
                      id="title"
                      type="text"
                      inputProps={{
                        ...input,
                        autoComplete: 'off'
                      }}
                      value={input.value}
                      onChange={this.props.updateItem({ title: input.value })}
                    />
                  )}
                </Field>
              </FormControl>
              <FormControl fullWidth className={classes.formControl}>
                <Field name="description">
                  {({ input, meta }) => (
                    <TextField
                      id="description"
                      margin="normal"
                      multiline
                      rows="4"
                      rowsMax="4"
                      inputProps={{
                        ...input,
                        autoComplete: 'off'
                      }}
                      value={input.value}
                      onChange={this.props.updateItem({
                        description: input.value
                      })}
                    />
                  )}
                </Field>
              </FormControl>
              <Field name="tags">
                {({ input, meta }) => {
                  return (
                    <Select
                      multiple
                      value={this.state.selectedTags}
                      onChange={e => this.handleSelectTags(e)}
                      renderValue={selected => {
                        return this.generateTagsText(tags, selected);
                      }}
                    >
                      {tags &&
                        tags.map(tag => (
                          <MenuItem key={tag.id} value={tag.id}>
                            <Checkbox
                              checked={
                                this.state.selectedTags.indexOf(tag.id) > -1
                              }
                            />
                            <ListItemText primary={tag.title} />
                          </MenuItem>
                        ))}
                    </Select>
                  );
                }}
              </Field>
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
