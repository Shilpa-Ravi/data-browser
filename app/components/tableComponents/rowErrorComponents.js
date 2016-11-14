import React from 'react';
import ReactDOM from 'react-dom'
import { observer } from "mobx-react"
import ReactTooltip from 'react-tooltip'

@observer
class RowErrorComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			checkHidden:true
		}
	}
	hover(what){
		this.setState({checkHidden:what})
	}
	componentDidMount(){
		//console.log(this.props)
	}
	render() {
		return (
           	<td onMouseEnter={this.hover.bind(this,false)} onMouseLeave={this.hover.bind(this,true)} className="tdtrcheck zi10">
           		<i className="fa fa-exclamation-triangle errorsigntd" aria-hidden="true" data-tip={ this.props.error }></i>
           		<ReactTooltip />
           	</td>
		);
	}
}

export default RowErrorComponent;