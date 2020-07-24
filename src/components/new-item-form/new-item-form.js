import React, {Component} from  'react';
import './new-item-form.css'

export default class ItemAddForm extends Component {

    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.label);
        this.state.label = "";
    }
    render() {
        const {onAdd} = this.props;
        return (
            <form className="item-add-form "
                  onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control"
                       onChange = {this.onLabelChange}
                       placeholder="What needs to be done"
                       value={this.state.label}
                />


                <button className="btn btn-outline-secondary">
                    Add item
                </button>
            </form>
        )
    }
}

