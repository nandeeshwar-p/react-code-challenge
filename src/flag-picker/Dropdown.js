import React from 'react';

export default class Dropdown extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchText:'',
            openDropDown:false,
            selectedValue:[],
            displayOptions:this.props.options || []
        }
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.myRef = React.createRef();
    }
    handleClickOutside = e => {
        if (!this.myRef.current.contains(e.target) || !this.props.multiSelect) {
          this.hideDropdown();
        }
      };
    showDropdown(){
       this.setState({openDropDown:true}, () => {
            document.addEventListener('click', this.handleClickOutside);
        });
      }
    
    hideDropdown(event) {
        this.setState({ openDropDown:false,searchText:"" }, () => {
            document.removeEventListener('click', this.handleClickOutside);
        });
    }
    
    
    onInputChange(event){
        const list = this.props.options.filter((item)=>{
            return item[this.props.valueIdentifier].toLowerCase().startsWith(event.target.value.toLowerCase())
        })
        this.setState({displayOptions:list,searchText:event.target.value});
    }
    handleChange(selectedItem){
        if(this.props.onSelect){
            this.props.onSelect(selectedItem);
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({displayOptions:nextProps.options,selectedValue:nextProps.selectedValues || []});
    }
    render(){
        return(
            <div className={this.props.parentClasses}>
                <h3 id="stepValue">{this.props.stepValue}</h3>
                <h4 id="stepText">{this.props.stepText}</h4>
                <div className="dropdown" ref={this.myRef}>
                    <input id="searchbox" type="text" value={this.state.searchText} onClick={this.showDropdown} onChange={this.onInputChange}/>
                    <ul value={this.state.searchText} tabIndex={1} className={this.props.listStyleClass} style={{display:this.state.openDropDown?"":"none"}} >
                        {!this.props.multiSelect && this.state.displayOptions.map((item)=>{
                            return <li tabIndex={1} key={item[this.props.valueIdentifier]} onClick={() => this.handleChange(item)}>{item[this.props.valueIdentifier]}</li>
                        })}
                        {this.props.multiSelect &&
                        
                            this.state.displayOptions.map((item)=>{
                                return <li tabIndex={1} key={item[this.props.valueIdentifier]} >
                                <input type="checkbox"
                                    checked={this.state.selectedValue.indexOf(item)>-1?true:false}
                                    onChange={() => this.handleChange(item)}
                                    className="form-check-input"
                                />
                            {item[this.props.valueIdentifier]}</li>
                            })
                        }
                    </ul>
                </div>
                {this.state.selectedValue.length>0 && this.props.onSelectionText &&
                    <>
                        <h4 id="textOnSelection">{this.props.onSelectionText}</h4>
                        <h3 id="selectedText">{this.state.selectedValue[0][this.props.valueIdentifier]}</h3>
                    </>
                }    
            </div>
        );
    }
}