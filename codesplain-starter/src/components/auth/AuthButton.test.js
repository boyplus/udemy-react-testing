import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { createServer } from '../../test/server';
import AuthButtons from './AuthButtons';

function renderComponent() {
  render(
    <MemoryRouter>
      <AuthButtons />
    </MemoryRouter>
  );
}

describe('when user is not signed in', () => {
  // createServer() ----> GET '/api/user' ---> {user: null}
  createServer([
    {
      path: '/api/user',
      res: () => {
        return {
          user: null
        };
      }
    }
  ])
  test('sign in and sign up are visible', async () => {
    renderComponent();
  });

  test('sign out is not visible', async () => {
    renderComponent();
  });
})


describe('when user is signed in', () => {
  createServer([
    {
      path: '/api/user',
      res: () => {
        return {
          user: {
            id: 1, email: 'boyplus@gmail.com'
          }
        };
      }
    }
  ])

  test('sign in and sign up are not visible', async () => {
    renderComponent();
  });

  test('sign out is visible', async () => {
    renderComponent();
  });
})


