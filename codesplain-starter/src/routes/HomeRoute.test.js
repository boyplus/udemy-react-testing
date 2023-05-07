import { render, screen } from "@testing-library/react";
import { setupServer } from 'msw/node';
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";

const handlers = [
  rest.get('/api/repositories', (req, res, ctx) => {
    const result = req.url.searchParams.get('q').split('language:');
    const language = result[1];

    return res(ctx.json(
      {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ]
      }
    ));
  })
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  // reset to default initiate
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

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

    expect(links).toHaveLength(2);
  }
  // Assert that the links have the appropriate full_name
});

const pause = () => new Promise(resolve => {
  setTimeout(resolve, 100)
})