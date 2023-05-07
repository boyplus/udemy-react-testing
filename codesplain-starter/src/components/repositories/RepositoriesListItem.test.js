import { render, screen } from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import { MemoryRouter } from 'react-router-dom';

function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'Javascript',
    description: 'The library for web and native user interfaces',
    owner: 'Facebook',
    name: 'react',
    html_url: 'https://github.com/facebook/react'
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
}

test('shows a link ti github homepage for this repo', async () => {
  renderComponent();

  await screen.findByRole('img', { name: 'Javascript' });
});

const pause = () => {
  return new Promise(resolve => {
    setTimeout(() => { resolve() }, 100)
  })
}