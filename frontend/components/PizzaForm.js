import React, { useReducer, useState } from 'react';
import { useCreateOrderMutation } from '../state/pizzaApi';

const CHANGE_INPUT = 'CHANGE_INPUT';
const TOGGLE_TOPPING = 'TOGGLE_TOPPING';
const RESET_FORM = 'RESET_FORM';

const initialState = {
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case TOGGLE_TOPPING: {
      const { name } = action.payload;
      return { ...state, [name]: !state[name] };
    }
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [createOrder, { isLoading: isCreatingOrder, error: creationError }] = useCreateOrderMutation();
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const onChange = (e) => {
    const { name, value, type,} = e.target;
    if (type === 'checkbox') {
      dispatch({ type: TOGGLE_TOPPING, payload: { name } });
    } else {
      dispatch({ type: CHANGE_INPUT, payload: { name, value } });
    }
  };

  const resetForm = () => {
    dispatch({ type: RESET_FORM });
  };

  const onNewOrder = (evt) => {
    evt.preventDefault();
    const { fullName, size, ...toppings } = state;
    const selectedToppings = Object.keys(toppings).filter((key) => toppings[key]);

    createOrder({ fullName, size, toppings: selectedToppings })
      .unwrap()
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setMessageType('success');
        resetForm();
      })
      .catch((err) => {
        console.log(err);
        setMessage('Order failed: ' + (err.message || 'Unknown error'));
        setMessageType('error');
      });
  };

  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {isCreatingOrder && <div className='pending'>Order in progress...</div>}
      {message && (
        <div className={messageType === 'success' ? 'success' : 'failure'}>
          {message}
        </div>
      )}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={state.size}
            onChange={onChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={state['1']}
            onChange={onChange}
          />
          Pepperoni<br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={state['2']}
            onChange={onChange}
          />
          Green Peppers<br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={state['3']}
            onChange={onChange}
          />
          Pineapple<br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={state['4']}
            onChange={onChange}
          />
          Mushrooms<br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={state['5']}
            onChange={onChange}
          />
          Ham<br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
