import React, { Component } from 'react';
import styles from './styles';
import { Form, Field, FormSpy } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/ShareItemPreview/reducer';
import { connect } from 'react-redux';
import { ADD_ITEM_MUTATION, ALL_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

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

  triggerInputFile = () => this.fileInput.current.click();
  saveItem = async (values, tags, addItem) => {
    try {
      const newItem = { ...values, tags: this.applyTags(tags) };
      await addItem({ variables: { item: newItem } });
    } catch (e) {
      throw Error(e);
    }
  };

  render() {
    const { classes, tags, updateItem } = this.props;

    return (
      <ViewerContext.Consumer>
        {({ loading, viewer }) => {
          return (
            <Mutation
              refetchQueries={() => [
                { query: ALL_ITEMS_QUERY, variables: { id: viewer.id } }
              ]}
              mutation={ADD_ITEM_MUTATION}
            >
              {(addItem, { data }) => (
                <Form
                  onSubmit={values => {
                    this.saveItem(values, tags, addItem);
                  }}
                  render={({
                    handleSubmit,
                    pristine,
                    invalid,
                    form,
                    values
                  }) => {
                    return (
                      <form
                        onSubmit={values => {
                          handleSubmit(values);
                          form.reset();
                          this.props.resetItem();
                        }}
                        className={classes.formContainer}
                      >
                        <FormSpy
                          subscription={{ values: true }}
                          component={({ values }) => {
                            if (values) {
                              this.dispatchUpdate(values, tags, updateItem);
                            }
                            return '';
                          }}
                        />
                        <Typography
                          variant="display2"
                          className={classes.tagline}
                        >
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
                        <FormControl fullWidth className={classes.form}>
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
                              />
                            )}
                          </Field>
                        </FormControl>
                        <FormControl fullWidth className={classes.form}>
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
                              />
                            )}
                          </Field>
                        </FormControl>
                        <Field name="tags">
                          {({ input, meta }) => {
                            return (
                              <Select
                                className={classes.form}
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
                                          this.state.selectedTags.indexOf(
                                            tag.id
                                          ) > -1
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
                      </form>
                    );
                  }}
                />
              )}
            </Mutation>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}

ShareForm.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  updateItem: PropTypes.func.isRequired
};

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
)(withRouter(withStyles(styles)(ShareForm)));
