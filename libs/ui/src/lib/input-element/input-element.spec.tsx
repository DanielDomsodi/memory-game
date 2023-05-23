import { render } from '@testing-library/react';

import InputElement from './input-element';

describe('InputElement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputElement />);
    expect(baseElement).toBeTruthy();
  });
});
