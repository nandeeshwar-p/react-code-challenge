import React from 'react';
import { mount,unmount } from 'enzyme';
import FlagComponent from './FlagComponent';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Testing Dropdown component with multiselect option",()=>{
    let wrapper;
    const myMockfn = jest.fn();
    
    const props = {
        parentClasses:"testComponent",
        onClear:myMockfn, 
        selectedValues:[]
    }
    beforeAll(() => {
        wrapper = mount(<FlagComponent {...props}/>)
    });
    it("test the component is rendered",()=>{
        expect(wrapper.find('.testComponent')).toBeTruthy();
    });
    it("test flags are not displayed when countries are not selected",()=>{
        expect(wrapper.find('.flag')).toHaveLength(0);
    });
    it("test button is not displayed when countries are not selected",()=>{
        expect(wrapper.find('button')).toHaveLength(0);
    });
    it("test text is not displayed when countries are not selected",()=>{
        expect(wrapper.find('h3')).toHaveLength(0);
    });
    it("test flags are not displayed when countries are not selected",()=>{
        wrapper.setProps({...props,selectedValues:[{name:"India",flag:"IN"},{name:"USA",flag:"US"}]})
        expect(wrapper.find('.flag')).toHaveLength(2);
    });
    it("test button is displayed",()=>{
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it("test on button click callback is triggered",()=>{
        const btn = wrapper.find('button');
        btn.simulate('click');
        expect(myMockfn).toBeCalled();
    });
    it("test text is displayed",()=>{
        expect(wrapper.find('h3')).toHaveLength(1);
    });
    afterAll(() => {
        unmount(wrapper);
    });
})