import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";

import { createServer } from '../test/server'

createServer([
  {
    path: '/api/repositories',
    method: 'get',
    res: (req) => {
      const result = req.url.searchParams.get('q').split('language:');
      const language = result[1];
      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ]
      };
    }
  }
]);

function renderComponent() {
  render(
    <MemoryRouter>
      <HomeRoute></HomeRoute>
    </MemoryRouter>
  );
}

test('renders two links for each language', async () => {
  renderComponent();

  // Loop over each language
  const languages = [
    'javascript',
    'typescript',
    'rust',
    'go',
    'python',
    'java',
  ];
  // For each language, make sure we see two linkes
  for (let language of languages) {
    const links = await screen.findAllByRole('link', {
      name: new RegExp(`${language}_`)
    });

    // Assert that the links have the appropriate full_name
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);

    expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`);
  }
});

const pause = () => new Promise(resolve => {
  setTimeout(resolve, 100)
})