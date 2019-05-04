import React from 'react';
import { mount,unmount } from 'enzyme';
import FlagPickerComponent from './FlagPickerComponent';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Testing Dropdown component with multiselect option",()=>{
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<FlagPickerComponent/>)
    });
    it("test the component is rendered",()=>{
        expect(wrapper.find('.parentComponent')).toBeTruthy();
    });
    it("test headers are displayed",()=>{
        expect(wrapper.find('.headerComponent')).toBeTruthy();
    });
    it("test step components are displayed",()=>{
        expect(wrapper.find('.stepComponent')).toHaveLength(3);
    });
    afterAll(() => {
        unmount(wrapper);
    });
})