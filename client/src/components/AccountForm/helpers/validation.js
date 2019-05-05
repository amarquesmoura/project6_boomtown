export default function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter a valid email';
  }
  if (!values.password) {
    errors.password = 'Please enter your password';
  }
  if (values.fullname && !values.fullname) {
    errors.password = 'Please enter your name';
  }
  return errors;
}
