import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  const app = shallow(<App />);
  // shallow rendering renders the component to a one level deep only
  // meaning if there are children components in the app component still we can test App
  // without knowing what is inside the child components

  it('Check Renders Correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it('Check the state for an empty list of gifts', () => {
    expect(app.state().gifts).toEqual([]);
  });

  describe('When clicking Add button', () => {
    const id = 1;

    beforeEach(() => {
      app.find('.btn-add').simulate('click');
    });

    afterEach(() => {
      app.setState({ gifts: [] });
    });

    it('check for new gift item in state', () => {
      expect(app.state().gifts).toEqual([{ id }]);
    });

    it('Add a new item', () => {
      expect(app.find('.gift-list').children().length).toEqual(id);
    });

    it('Check for creation of Gift Component in App.js file', () => {
      expect(app.find('Gift').exists()).toBe(true);
    });

    describe('When Removegift function is Clicked', () => {
      beforeEach(() => {
        app.instance().removeGift(id);
      });

      it('check removes the gift from the state', () => {
        expect(app.state().gifts).toEqual([]);
      });
    });
  });
  console.log(app.debug());
});

// "it" is a global object provided by the jest to perform unit test which takes two parameters
// first is a string which describes the testing
// second is the function which jest runs to test
// "decribe" is the global object provided by JEST to group all the related unit test together
// first argument is the name of the group
// second is the function containing all the unit tests.
// "beforeEach" method provided by JEST gets called before execution of each unit test present in the describe block
// "afterEach" method provided by JEST gets called after execution of each unit test present in the describe block
// "instance" method provided by JEST can be used to run the different methods of the shallpw rendered Component
