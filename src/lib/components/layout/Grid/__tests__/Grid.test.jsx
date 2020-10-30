import React from 'react';
import { shallow } from 'enzyme';
import { Grid } from '../Grid';

describe('rendering', () => {
  it('renders correctly with no children', () => {
    const tree = shallow((
      <Grid />
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a single child', () => {
    const tree = shallow((
      <Grid>
        <div>content</div>
      </Grid>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <Grid>
        <div>content 1</div>
        <div>content 2</div>
        <div>content 3</div>
      </Grid>
    ));

    expect(tree).toMatchSnapshot();
  });
});
