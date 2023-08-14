import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const InputField = styled.input` 
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

function App() {
  const [message, setMessage] = useState('');


  const [inputValues, setInputValues] = useState(Array(8).fill(''));

  const handleInputChange = (index, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValues),
      });

      if (response.ok) {
        console.log('Data stored successfully');
        fetch('http://127.0.0.1:5000/display')
          .then(response => response.json())
          .then(data => setMessage(data.message))
          .catch(error => console.error('Error:', error));
      } else {
        console.error('Failed to store data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <FormContainer>
        <InputField
          type="text"
          placeholder="Enter Pregnancies"
          value={inputValues[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Enter Glucose"
          value={inputValues[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Enter Blood Pressure"
          value={inputValues[2]}
          onChange={(e) => handleInputChange(2, e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Enter Skin Thickness"
          value={inputValues[3]}
          onChange={(e) => handleInputChange(3, e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Enter Insulin"
          value={inputValues[4]}
          onChange={(e) => handleInputChange(4, e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Enter BMI"
          value={inputValues[5]}
          onChange={(e) => handleInputChange(5, e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Enter DiabetesPedigreeFunction"
          value={inputValues[6]}
          onChange={(e) => handleInputChange(6, e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Enter Age"
          value={inputValues[7]}
          onChange={(e) => handleInputChange(7, e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        <div className="msg" style={{ marginTop: '10px', marginBottom: '10px' }}>
          {message}
        </div>
      </FormContainer>
    </div>
  );
}

export default App;
