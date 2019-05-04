import React from 'react';
import Dropdown from './Dropdown';
import continents from './assets/continents.json';
import FlagComponent from './FlagComponent';
import './assets/flagpicker.css';

export default class FlagPickerComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedContinent:null,
            selectedCountries:[],
        }
        this.handleContinentSelection = this.handleContinentSelection.bind(this);
        this.handleCountrySelection = this.handleCountrySelection.bind(this);
        this.handleClearSelection = this.handleClearSelection.bind(this);
    }
    handleContinentSelection(event){
        this.setState({selectedContinent:event,selectedCountries:[]})
    }
    handleCountrySelection(event){
        let selectedValues = this.state.selectedCountries;
        if(selectedValues.indexOf(event)>-1){
            selectedValues.splice(selectedValues.indexOf(event),1);
        }else{
            selectedValues.push(event);
        }
        
        this.setState({selectedCountries:selectedValues});
    }
    
    handleClearSelection(event){
        this.setState({selectedCountries:[]})
    }
    render(){
        return(
            <div className={"parentComponent"}>
                <header className={"headerComponent"}>
                    <div className="title">Flag Picker</div>
                    <div className="subTitle">This app will help you learn flags around the world in <u>3 Steps</u></div>
                </header>
                <div className="box-display">
                <Dropdown 
                    parentClasses={"stepComponent"}
                    options={continents} 
                    stepValue={"Step 1"} 
                    stepText={"Select a Continent."} 
                    onSelectionText={"You Selected"} 
                    valueIdentifier={"continent"} 
                    selectedValues={this.state.selectedContinent?[this.state.selectedContinent]:null} 
                    onSelect={this.handleContinentSelection}
                />
                <Dropdown 
                    parentClasses={"stepComponent"}
                    listStyleClass={"left-align"}
                    options={this.state.selectedContinent?this.state.selectedContinent.countries:[]} 
                    stepValue={"Step 2"} 
                    stepText={"Now, select a country."}  
                    valueIdentifier={"name"} 
                    selectedValues={this.state.selectedCountries} 
                    onSelect={this.handleCountrySelection}
                    multiSelect={true}
                />
                <FlagComponent 
                    parentClasses={"stepComponent"} 
                    onClear={this.handleClearSelection} 
                    selectedValues={this.state.selectedCountries}
                />
            </div>
            </div>
        );
    }
}