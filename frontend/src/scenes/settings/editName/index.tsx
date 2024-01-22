import React, { useState, FormEvent } from 'react';

const EditName = () => {
 const [name, setName] = useState("");

 const handleChange = (event: FormEvent<HTMLInputElement>) => {
  setName(event.currentTarget.value);
 };

 const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log(`New name: ${name}`);
 };

 return (
  <form onSubmit={handleSubmit}>
    <label>
      Enter your new name: <input type="text" value={name} onChange={handleChange} />
    </label>
    <input type="submit" value="Submit" />
  </form>
 );
};

export default EditName;
