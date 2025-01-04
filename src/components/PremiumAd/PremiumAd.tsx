import React from 'react';
import styled from 'styled-components';

const AdContainer = styled.div`
  padding: 25px;
  background-color: #f9f9f9f9;
  margin-top: 20px;
  text-align: center;
  border-radius: 20px; /* Añadir bordes redondeados */
`;

const PremiumButton = styled.button`
  margin-top: 5px;
  padding: 10px 20px;
  border: none;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

const PremiumAd: React.FC = () => {
  return (
    <AdContainer>
      <div>¡LETS GO!</div>
      <div>Aprender ingles nunca fue tan divertido y facil...</div>
    </AdContainer>
  );
};

export default PremiumAd;
