import React from 'react';
import { shallow } from 'enzyme';
import Gift from './Gift';

describe('Gift', () => {
  const mockRemove = jest.fn();
  // jest.fn() is the mock function which can be used as a function to test whether it is called when an event happens
  const id = 1;
  const props = {
    gift: { id },
    removeGift: mockRemove
  };

  const gift = shallow(<Gift {...props} />);

  it('Check Renders Correctly', () => {
    expect(gift).toMatchSnapshot();
  });

  it('Check the state for an empty list of gifts', () => {
    expect(gift.state()).toEqual({ person: '', present: '' });
  });

  describe('Check for typing into the person input', () => {
    const person = 'Uncle';
    beforeEach(() => {
      gift
        .find('.input-person')
        .simulate('change', { target: { value: person } });
    });

    it('Check updates the person of the state', () => {
      expect(gift.state().person).toEqual(person);
    });
  });

  describe('Check for typing into the present input', () => {
    const present = 'Laptop';
    beforeEach(() => {
      gift
        .find('.input-present')
        .simulate('change', { target: { value: present } });
    });

    it('Check updates the present of the state', () => {
      expect(gift.state().present).toEqual(present);
    });
  });

  describe('when clicking the remove button', () => {
    beforeEach(() => {
      gift.find('.btn-remove').simulate('click');
    });

    it('calls the removegift callback', () => {
      expect(props.removeGift).toHaveBeenCalledWith(id);
    });
  });
});
