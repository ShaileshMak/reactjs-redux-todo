import React, { Component } from 'react';
import "./AddEditToDo.css";
import { connect } from 'react-redux';
import { addToDo, showNewToDoForm, editedToDo, getToDosStatusCount } from '../../actions/todoActions';
import PropTypes from 'prop-types'

class AddEditToDo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toDoValue: '',
            targetDate: this.getDate(),
            isEditFlow: false,
            idOfEdit: -1
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({
            isEditFlow: !!id,
            idOfEdit: id || -1
        })
        if(id) {
            const todoToEdit = this.props.todo.toDoList.filter(toDo => toDo.id === id)[0];
            this.setState( {
                toDoValue: todoToEdit.name,
                targetDate: todoToEdit.targetDate
            })
        } 
        this.props.showNewToDoForm();
    }
    
    getDate = (date = new Date()) => {
        let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0]
        return dateString;    
    }

    onChange = (event) => {
        this.setState( {
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) =>  {
        event.preventDefault();
        const toDoData = {
            toDoValue: this.state.toDoValue,
            targetDate: this.state.targetDate,
            idOfEdit: this.state.idOfEdit
        };
        this.state.isEditFlow ? 
            this.props.editedToDo(toDoData): 
            this.props.addToDo(toDoData);
        this.props.getToDosStatusCount();
        this.props.history.push('/');
    }

    render() {
        return (
            <form autoComplete="off" onSubmit={this.onSubmit}>
                <div className="form-field-container">
                    <label>
                        <span className="label-span">To Do : </span>
                        <input className="toDo-input" type="text" name="toDoValue" onChange={this.onChange} value={this.state.toDoValue} />
                    </label>
                </div>
                <div className="form-field-container">
                    <label>
                        <span className="label-span">Target Date : </span>
                        <input className="toDo-target-date" type="date" name="targetDate" onChange={this.onChange} value={this.state.targetDate}></input>
                    </label>
                </div>
                <button className="save-button" type="submit">Save</button>
            </form>
        )
    }
}

AddEditToDo.propTypes = {
    addToDo: PropTypes.func.isRequired,
    showNewToDoForm: PropTypes.func.isRequired,
    editedToDo: PropTypes.func.isRequired,
    getToDosStatusCount: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    todo: state.todo
})

export default connect(mapStateToProps, 
    { 
        addToDo,
        editedToDo,
        showNewToDoForm,
        getToDosStatusCount
    }
)(AddEditToDo)
