import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { idPropTest } from '../../../../../../tests/propTests/idPropTest';
import { raisedPropTest } from '../../../../../../tests/propTests/raisedPropTest';
import { Paper } from '../Paper';

describe('rendering', () => {
  it.each([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { children: null },
      (rootElement) => expect(rootElement).toBeInTheDocument(),
    ],
    ...idPropTest,
    ...raisedPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Paper
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});