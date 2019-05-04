import React from 'react';

export default class FlagComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selectedCountries:this.props.selectedValues || [],
        }
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    handleButtonClick(event){
        if(this.props.onClear){
            this.props.onClear();
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({selectedCountries:nextProps.selectedValues});
    }
    render(){
        return (
            <div className={this.props.parentClasses+" flagComponentParent"}>
                {this.state.selectedCountries.length>0 &&
                <h3> {"Selected Flags"}</h3>
                }
                <div className="box-display">
                    {this.state.selectedCountries.map((item)=>{
                        let flagname = item.flag;
                        flagname = flagname.toLowerCase();
                        // return <div><img src={"https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.3.0/flags/1x1/"+flagname} alt={item.name} styles={{height:"50px",width:"80px"}}/></div>
                        return <div key={flagname} className={"flag flag-"+flagname}/> 
                    })
                    }
                </div>
                {this.state.selectedCountries.length>0 &&
                    <button onClick={this.handleButtonClick}>Clear Flags</button>
                }
            </div>
        );
    }
}
