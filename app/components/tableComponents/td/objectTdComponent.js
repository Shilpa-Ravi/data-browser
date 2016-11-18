import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';

class ObjectTdComponent extends React.Component {
	constructor(){
		super()
		this.state = {
			isModalOpen:false,
			objectVal:'',
			jsonValidated:false
		}
	}
	componentDidMount(){
		let data = JSON.stringify(this.props.elementData) || ''
		this.setState({objectVal:data})
	}
	openCloseModal(what){
		this.state.isModalOpen = what
		this.setState(this.state)
	}
	changeHandler(value,e){
  		this.setState({objectVal:value})
  		this.verifyJson()
    }
	jsonSave(){
		this.props.updateElement(JSON.parse(this.state.objectVal))
    	this.props.updateObject()
    	this.openCloseModal(false)
	}
	verifyJson(){
		try{
    		JSON.parse(this.state.objectVal)
    		this.setState({jsonValidated:true})
    	} catch(e){
    		this.setState({jsonValidated:false})
    	}
	}
	cancelJsonUpdate(){
		this.props.fetchObject()
		this.openCloseModal(false)
	}
	handleClose(){

	}
	render() {
		let jsonData = JSON.stringify(this.props.elementData) || ''
		return (
            <td className='mdl-data-table__cell--non-numeric pointer'>
            	<span className="color888">{ jsonData ? jsonData.slice(0,20) : 'Json Object' }</span>
            	<i className="fa fa-expand fr" aria-hidden="true" onClick={this.openCloseModal.bind(this,true)}></i>
            	<Dialog title="Json Object Editor" modal={false} open={this.state.isModalOpen} onRequestClose={this.handleClose.bind(this)} titleClassName="modaltitle">
	          		<AceEditor
					    mode="json"
					    theme="github"
					    onChange={this.changeHandler.bind(this)}
					    value={ this.state.objectVal }
					    name="json"
					    className="jsonmodal"
					    setOptions={{wrapBehavioursEnabled:true}}
					    minLines={5}
					/>
	          		<button className="btn btn-primary fr ml5" onClick={this.jsonSave.bind(this)} disabled={ !this.state.jsonValidated }>SUBMIT</button>
	          		<button className="btn btn-danger fr" onClick={this.cancelJsonUpdate.bind(this)}>CLOSE</button>
        		</Dialog>
            </td>
		);
	}
}

export default ObjectTdComponent;