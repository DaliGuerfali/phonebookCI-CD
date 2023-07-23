import React from 'react';

const PersonForm = ({ onNameChange, nameValue, onNumberChange, numberValue, onClick }) => {
  return (
    <form>
      <div>
            name: <input id="name_input" onChange={onNameChange} value={nameValue} />
      </div>
      <div>
            number: <input id="number_input" onChange={onNumberChange} value={numberValue} />
      </div>
      <div>
        <button onClick={onClick} type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;