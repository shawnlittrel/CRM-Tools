import { Button, chakra, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { useState } from 'react';
import { PasswordField } from '../PasswordField'
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../../../database/mutations';
import Auth from '../../../utils/auth';

function LoginForm() {
  const [formState, setFormState] = useState({ email: '', password: ''});
  const [login, { error }] = useMutation(LOGIN);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault() // your login logic here

    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password} })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      window.location.replace('/');
      
    } catch (err) {
      console.error(err);
    }

    setFormState({
      email: '',
      password: '',
    });
  }

  return (
  <chakra.form
    onSubmit={handleFormSubmit}
  >
    <Stack spacing="6">
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input name="email" type="email" autoComplete="email" value={formState.email} onChange={handleChange} required />
      </FormControl>
      <PasswordField value={formState.password} onChange={handleChange} />
      <Button type="submit" colorScheme="blue" size="lg" fontSize="md" onSubmit={handleFormSubmit}>
        Sign in
      </Button>
    </Stack>
  </chakra.form>

  )
};

export default LoginForm;