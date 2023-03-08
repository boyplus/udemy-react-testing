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
  // NOT THE BEST IMPLEMENTATION
  const argList = [];
  const callback = (...args) => {
    console.log('args is', args)
    argList.push(args);
  }
  // render component
  render(<UserForm onUserAdd={callback} />);

  // Find two inputs
  const [nameInput, emailInput] = screen.getAllByRole('textbox');

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
  expect(argList).toHaveLength(1);
  expect(argList[0][0]).toEqual({ name: 'jane', email: 'jane@gmail.com' });
});

