[{"content":"## Welcome to RTLBook\n\nThis is an interactive coding environment where you can explore the following libraries:\n\n| Name      | Docs |\n| ----------- | ----------- |\n| React      | [docs](https://reactjs.org/)       |\n| @testing-library/react   |  [docs](https://testing-library.com/docs/react-testing-library/intro/)        |\n| @testing-library/user-event |   [docs](https://testing-library.com/docs/user-event/intro)  |\n| @testing-library/react-hooks |  [docs](https://github.com/testing-library/react-hooks-testing-library)  |\n| @testing-library/jest-dom | [docs](https://github.com/testing-library/jest-dom#custom-matchers) |\n| expect |  [docs](https://jestjs.io/docs/expect)  |\n\nIn between each 'cell' there are buttons that can add in a new code editor or a text section.","type":"text","id":"12frm"},{"content":"import {screen, render, within} from '@testing-library/react';\n\nfunction FormData(){\n  return (\n    <div>\n      <button>Go Back</button>\n      <form aria-label=\"form\">\n        <button>Save</button>\n        <button>Cancel</button>\n      </form>\n    </div>\n\n  );\n}\n\nrender(<FormData />);","type":"code","id":"doqly"},{"content":"function toContainRole(container, role, quantity = 1) {\n  const els = within(container).getAllByRole(role);\n  if(els.length === quantity){\n    return {\n      pass: true\n    }\n  }\n  return {\n    pass: false,\n    message: () => `Expected to find ${quantity} ${role} elements. Found ${els.length} instead`\n  }\n}\nexpect.extend({toContainRole});","type":"code","id":"eenry"},{"content":"\ntest('the form display two buttons', () => {\n  render(<FormData />);\n\n  const form = screen.getByRole('form');\n\n  // const buttons = within(form).getAllByRole('button');\n  // expect(buttons).toHaveLength(2);\n\n  expect(form).toContainRole('button', 2);\n});","type":"code","id":"4gw5c"}]