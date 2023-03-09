import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
  // Render the component
  render(<UserForm />);

  // Manipulate the component to find an element in it
  const inputs = screen.getAllByRole('textbox');
  // Exactly one element, otherwise throw error
  const button = screen.getByRole('button');

  // Assertion - make sure compoent is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});


test('it calls onUserAdd when the form is submitted', () => {
  const mock = jest.fn();

  // render component
  render(<UserForm onUserAdd={mock} />);

  // Find two inputs (use array is not a good idea since order or input might be changed over time)
  // should query by label instead. That's why we move to this code instead of getAllByRole
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });

  // Simulate typing email
  user.click(nameInput);
  user.keyboard('jane');

  // Simulate typing name
  user.click(emailInput);
  user.keyboard('jane@gmail.com');

  // Find the button
  const button = screen.getByRole('button');

  // Simulate click button
  user.click(button);

  // Assertion to make sure onAddUser gets called with name and email
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@gmail.com' });
});

test('it empty two inputs when form is submitted', () => {
  // We can use empty arrow function instead of jest.fn()
  // Since we do not care about this function at all
  render(<UserForm onUserAdd={() => { }} />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button');

  user.click(nameInput);
  user.keyboard('jane');
  user.click(emailInput);
  user.keyboard('jane@gmail.com');

  user.click(button);

  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
});

