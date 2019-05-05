export default function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Please enter a title for your item';
  }
  if (!values.description) {
    errors.description = 'Please enter description of your item';
  }
  if (!values.tags) {
    errors.tags = 'Please add at least one tag to your item';
  }

  return errors;
}
