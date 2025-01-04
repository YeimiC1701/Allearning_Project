import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Exercise } from "@/mockCourses/Courses";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 600px;
  margin: 20px auto;
  animation: ${fadeIn} 0.3s ease;
`;

const Question = styled.h4`
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 20px;
  text-align: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #2ecc71;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }
`;

const ResultMessage = styled.div<{ correct: boolean }>`
  margin-top: 10px;
  color: ${({ correct }) => (correct ? '#2ecc71' : '#e74c3c')};
  font-size: 1.2rem;
  text-align: center;
`;

const HintContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const HintIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.3s ease;
`;

const PopupMessage = styled.p`
  margin: 0 0 10px;
  font-size: 1.2rem;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

interface OpenEndedProps {
  exercise: Exercise;
}

const OpenEnded: React.FC<OpenEndedProps> = ({ exercise }) => {
  const [answer, setAnswer] = useState<string>('');
  const [result, setResult] = useState<boolean | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);

  const handleSubmit = () => {
    if (answer.toLowerCase() === (exercise.answer as string).toLowerCase()) {
      setResult(true);
      setPopupMessage('¡Correcto!');
    } else {
      setResult(false);
      setPopupMessage('Incorrecto, intenta de nuevo.');
      setAttempts(attempts + 1);
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <Container>
      <Question>{exercise.question}</Question>
      <TextArea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Escribe tu respuesta aquí"
      />
      <Button onClick={handleSubmit}>Subir respuesta</Button>
      {result !== null && <ResultMessage correct={result}>{result ? 'Correcto' : 'Incorrecto'}</ResultMessage>}
      {exercise.hint && attempts >= 3 && (
        <HintContainer>
          <HintIcon icon={faLightbulb} />
          {exercise.hint}
        </HintContainer>
      )}
      {showPopup && (
        <>
          <Overlay onClick={closePopup} />
          <PopupContainer>
            <PopupMessage>{popupMessage}</PopupMessage>
            <CloseButton onClick={closePopup}>Cerrar</CloseButton>
          </PopupContainer>
        </>
      )}
    </Container>
  );
};

export default OpenEnded;
