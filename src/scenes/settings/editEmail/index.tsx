import React, { useState, FormEvent } from 'react';

const EditEmail = () => {
 const [email, setEmail] = useState("");

 const handleChange = (event: FormEvent<HTMLInputElement>) => {
  setEmail(event.currentTarget.value);
 };

 const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log(`New email: ${email}`);
 };

 return (
  <form onSubmit={handleSubmit}>
    <label>
      Enter your new email: <input type="text" value={email} onChange={handleChange} />
    </label>
    <input type="submit" value="Submit" />
  </form>
 );
};

export default EditEmail;
