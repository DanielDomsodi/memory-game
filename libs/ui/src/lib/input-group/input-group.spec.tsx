import { render } from '@testing-library/react';

import InputGroup from './input-group';

describe('InputGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputGroup />);
    expect(baseElement).toBeTruthy();
  });
});
