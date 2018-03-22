import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import Button from '../index';

jest.mock('../../Icon/load-material-design-icons');

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<Button
      label="button"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly primary', () => {
    const tree = shallow(<Button
      label="button"
      priority="primary"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly flat', () => {
    const tree = shallow(<Button
      label="button"
      priority="flat"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly variant', () => {
    const tree = shallow(<Button
      label="button"
      variant="success"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly size', () => {
    const tree = shallow(<Button
      label="button"
      size="large"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with icon', () => {
    const tree = shallow(<Button
      label="button"
      icon="album"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<Button
      label="button"
      priority="flat"
      variant="success"
      size="large"
      icon="album"
      iconPosition="after"
      isLabelVisible={false}
      disabled
      loading
      block
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls clickHandler() on click', () => {
    const spy = sinon.spy();
    const component = mount(<Button
      label="label"
      clickHandler={spy}
    />);

    component.simulate('click');
    expect(spy.calledOnce).toEqual(true);
  });
});
