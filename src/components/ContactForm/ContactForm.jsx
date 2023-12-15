import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  state = INITIAL_STATE;

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { onAdd, onCheckUnique } = this.props;

    const isValidatedForm = this.validateForm();
    if (!isValidatedForm) return;

    const isUnique = onCheckUnique(name);
    if (!isUnique) return;

    onAdd({ id: 'id' + nanoid(), name, number });
    this.resetForm();
  };

  validateForm = () => {
    const { name, number } = this.state;
    const { onCheckUnique } = this.props;

    if (!name || !number) {
      alert('Some field is empty');
      return false;
    }

    return onCheckUnique(name);
  };

  resetForm = () => this.setState(INITIAL_STATE);

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit} className={css.formContact}>
        <label htmlFor="nameInput" className={css.labelInput}>
          Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChangeForm}
          className={css.inputContact}
        />
        <label htmlFor="phoneInput" className={css.labelInput}>
          Number
        </label>
        <input
          type="tel"
          name="number"
          value={number}
          required
          onChange={this.handleChangeForm}
          className={css.inputContact}
        />
        <button type="submit" className={css.buttonContact}>
          Add Contact
        </button>
      </form>
    );
  }
}
