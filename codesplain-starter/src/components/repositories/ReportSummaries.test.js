import { screen, render } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

test('display information about the repository', () => {
  const repository = {
    language: 'Javascript',
    stargazers_count: 12,
    open_issues: 10,
    forks: 20
  };
  render(<RepositoriesSummary repository={repository} />);
  for (const key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(value));

    expect(element).toBeInTheDocument();
  }
});