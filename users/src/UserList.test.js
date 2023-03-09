import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

function renderComponent() {
  const users = [
    { name: 'jane', email: 'jane@gmail.com' },
    { name: 'sam', email: 'sam@gmail.com' },
  ];

  const { container } = render(<UserList users={users} />);

  return { users, container };
}

// Testing lib suggest that you should not render component in beforeEach
// You should use function renderComponent that is defined by ourselves instead
beforeEach(() => {

});

test('render one row per user', () => {
  // Render the component
  const { users, container } = renderComponent();

  // Find all rows in the table
  // const table = container.querySelector('table');
  // const rows = within(screen.getByTestId('users')).getAllByRole('row');
  const rows = container.querySelectorAll('tbody tr');

  // Assertion: correct the number of rows in table
  expect(rows).toHaveLength(users.length)
});

test('render the email and name of each user', () => {
  const { users } = renderComponent();

  for (const user of users) {
    //                                    name here is the key
    const name = screen.getByRole('cell', { name: user.name })
    const email = screen.getByRole('cell', { name: user.email })
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }

});