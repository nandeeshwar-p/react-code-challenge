import React from 'react';
import { mount,unmount } from 'enzyme';
import Dropdown from './Dropdown';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Testing Dropdown component with multiselect option",()=>{
    let wrapper;
    const myMockfn = jest.fn();
    const mockData = [
        {"name": "China", "flag": "CN"},
        {"name": "India","flag": "IN"},
        {"name": "Indonesia","flag": "ID"},
        {"name": "Pakistan","flag": "PK"},
        {"name": "Bangladesh","flag": "BD"}
    ]
    const props = {
        parentClasses:"testClass",
        options:mockData,
        stepValue:"Test Step",
        stepText:"Select a Continent.",
        onSelectionText:"You Selected", 
        valueIdentifier:"name",
        selectedValues:[],
        onSelect:myMockfn,
        multiSelect:true
    }
    beforeAll(() => {
        wrapper = mount(<Dropdown {...props}/>)
    });
    it('test if the dropdown is mounted',()=>{
        expect(wrapper.find('.testClass')).toBeTruthy();
    })
    it('test "Test Step" text is displayed' ,()=>{
        expect(wrapper.find("#stepValue").text()).toBe('Test Step');
    })
    it('test "Select a Continent" text is displayed' ,()=>{
        expect(wrapper.find("#stepText").text()).toBe('Select a Continent.');
    })
    it('test input text box is rendered' ,()=>{
        expect(wrapper.find("#searchbox")).toHaveLength(1)
    })
    it('test list is rendered' ,()=>{
        expect(wrapper.find("ul")).toHaveLength(1)
    })
    it('test listitems with chechboxes are rendered' ,()=>{
        expect(wrapper.find({ type: 'checkbox' })).toHaveLength(mockData.length)
    })
    it('test callback is called on clicking a chechbox' ,()=>{
        let checkBox = wrapper.find({type: 'checkbox'}).first();
        checkBox.simulate('change');
        expect(myMockfn).toBeCalled();
    })
    it('test if dropdown is opened on clicking input box' ,()=>{
        let input = wrapper.find({type: 'text'});
        input.simulate('click');
        expect(wrapper.state().openDropDown).toBeTruthy();;
    })
    it('test multiselect is enabled',()=>{
        let input = wrapper.find({type: 'text'});
        input.simulate('click');
        let checkBox = wrapper.find({type: 'checkbox'}).first();
        let lastCheckBox = wrapper.find({type: 'checkbox'}).last();
        checkBox.simulate('change');
        lastCheckBox.simulate('change');
        expect(wrapper.state().openDropDown).toBeTruthy();
    })
    afterAll(() => {
        unmount(wrapper);
    });
})
describe("Testing Dropdown component with single select option",()=>{
    let wrapper;
    const myMockfn = jest.fn();
    const spyPreventDefault = jest.spyOn(Dropdown.prototype, 'handleChange');
    const mockData = [
        {"name": "China", "flag": "CN"},
        {"name": "India","flag": "IN"},
        {"name": "Indonesia","flag": "ID"},
        {"name": "Pakistan","flag": "PK"},
        {"name": "Bangladesh","flag": "BD"}
    ]
    const props = {
        parentClasses:"testClass",
        options:mockData,
        stepValue:"Test Step",
        stepText:"Select a Continent.",
        onSelectionText:"You Selected", 
        valueIdentifier:"name",
        selectedValues:[],
        onSelect:myMockfn
    }
    beforeAll(() => {
        wrapper = mount(<Dropdown {...props}/>)
    });
    it('test list is rendered' ,()=>{
        expect(wrapper.find("ul")).toHaveLength(1)
    })
    it('test listitems with chechboxes are not-rendered' ,()=>{
        expect(wrapper.find({ type: 'checkbox' })).toHaveLength(0)
    })
    it('test listitems are rendered' ,()=>{
        expect(wrapper.find("li")).toHaveLength(mockData.length)
    })
    it('test handleChange method is called on clicking listitem',()=>{
        let input = wrapper.find({type: 'text'});
        input.simulate('click');
        let checkBox = wrapper.find("li").first();
        checkBox.simulate('click');
        expect(spyPreventDefault).toHaveBeenCalled()
    })
    afterAll(() => {
        unmount(wrapper);
    });
})