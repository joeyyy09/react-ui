import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import MultipleSelectField from '../index';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<MultipleSelectField
      fieldId="test"
      label="label"
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
        {
          label: 'choice 2',
          value: 'ch2',
        },
      ]}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly only one option', () => {
    const tree = shallow(<MultipleSelectField
      fieldId="test"
      label="label"
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
      ]}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<MultipleSelectField
      label="label"
      isLabelVisible={false}
      disabled
      fieldId="test"
      value="ch1"
      description="some help"
      error="some error"
      required
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
        {
          label: 'choice 2',
          value: 'ch2',
        },
      ]}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with one selected option', () => {
    const tree = shallow(<MultipleSelectField
      fieldId="test"
      label="label"
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
        {
          label: 'choice 2',
          value: 'ch2',
        },
      ]}
      value={['ch1']}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with two selected options', () => {
    const tree = shallow(<MultipleSelectField
      fieldId="test"
      label="label"
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
        {
          label: 'choice 2',
          value: 'ch2',
        },
      ]}
      value={['ch1', 'ch2']}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls changeHandler() on changing selected option', () => {
    const spy = sinon.spy();
    const component = mount(<MultipleSelectField
      label="label"
      fieldId="id"
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
        {
          label: 'choice 2',
          value: 'ch2',
        },
      ]}
      changeHandler={spy}
      value={['ch1']}
    />);

    component
      .find('select')
      .simulate('change', {
        preventDefault: () => {},
        target: { value: 'ch2' },
      });
    expect(spy.calledOnce).toEqual(true);
  });
});