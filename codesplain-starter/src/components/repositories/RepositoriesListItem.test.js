import { render, screen, act } from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import { MemoryRouter } from 'react-router-dom';

// Module mock -> mock by using this simple component
// jest.mock('../tree/FileIcon', () => {
//   // Content of FileIcon.js
//   return () => {
//     return 'File icon component';
//   }
// });

function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'Javascript',
    description: 'The library for web and native user interfaces',
    owner: {
      login: 'facebook',
    },
    name: 'react',
    html_url: 'https://github.com/facebook/react'
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository }
}

test('shows a link ti github homepage for this repo', async () => {
  const { repository } = renderComponent();

  // Last case fallback (th worst solution)
  // await act(async () => {
  //   await pause();
  // });

  // The best solution is to use findBy
  // That the component will be rendered when state changes
  await screen.findByRole('img', { name: 'Javascript' });

  const link = screen.getByRole('link', { name: /github repository/i });
  expect(link).toHaveAttribute('href', repository.html_url);
});

test('shows a fileicon with the appropriate icon', async () => {
  renderComponent();

  const icon = await screen.findByRole('img', { name: 'Javascript' });
  expect(icon).toHaveClass('js-icon');

});

test('shows a link to the code editor page', async () => {
  const { repository } = renderComponent();

  await screen.findByRole('img', { name: 'Javascript' });
  const link = await screen.findByRole('link', { name: new RegExp(repository.owner.login) });
  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`);
})

const pause = () => {
  return new Promise(resolve => {
    setTimeout(() => { resolve() }, 100)
  })
}