import { useState } from 'react';
import PropTypes from 'prop-types';

import { isEmailValid } from '../../utils/isEmailValid';

import { Form, ButtonConantainer } from './styles';

import { FormGroup } from '../FormGroup';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';

export function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      name,
      email,
      phone,
      category,
    });
  }

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'Nome é obrigatorio' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'name',
      ));
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      if (errors.find((error) => error.field === 'email')) {
        return;
      }

      setErrors((prevState) => [
        ...prevState,
        { field: 'email', message: 'Email inválido' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'email',
      ));
    }
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={(event) => handleNameChange(event)}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="E-mail"
          value={email}
          onChange={(event) => handleEmailChange(event)}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>

      <ButtonConantainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonConantainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
