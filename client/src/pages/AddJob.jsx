import React from 'react';
import { useState } from 'react';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location,setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Begginer level');
  const [salary,setSalary] = useState(0);


  return (
    <div>
      <form action="">
        <div>
          <p></p>
          <input type="text" />
        </div>
      </form>
    </div>
  )
}

export default AddJob