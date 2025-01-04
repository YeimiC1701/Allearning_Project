import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('fondo.jpeg') no-repeat center center/cover;
    opacity: 0.3; /* Ajusta la opacidad según sea necesario */
    z-index: -1;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 150px;
`;

const AuthButtons = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Button = styled.button`
  background: #2C3E50;
  border: 2px solid #000;
  color: #fff;
  border-radius: 20px;
  padding: 20px 40px;
  margin-left: 40px;
  cursor: pointer;

  transition: transform 0.3s ease, fill 0.3s ease;
  &:hover {
    transform: scale(1.15);
  }
`;

const Title = styled.h1`
  font-size: 7rem;
  color: #2C3E50;
`;

const Subtitle = styled.h2`
  margin-top: -10px;
  margin-bottom: 40px;
  color: #2C3E50;
  font-size: 2rem;
  width: 65%;
  text-align: center;
`;

const WelcomePage = () => {
  const router = useRouter();

  const handleClick = (path: string): void => {
    router.push(path);
  };

  return (
    <Container>
      <Logo src="logo-negro.png" alt="Logo" />
      <AuthButtons>
        <Button onClick={() => handleClick('/LoginPage')}>Inicia sesión</Button>
        <Button onClick={() => handleClick('/RegisterPage')}>Regístrate</Button>
      </AuthButtons>
      <Title>BIENVENIDO A ALLEARNING</Title>
      <Subtitle>SOMOS UNA PLATAFORMA WEB ORIENTADA AL APRENDIZAJE DE INGLES CON UN ENFOQUE INFANTIL, IDEAL PARA AQUELLOS NIÑOS QUE DESEEN INCURSIONAR EN EL MUNDO BILINGUE Y REFORZAR SUS HABILIDADES. </Subtitle>
    </Container>
  );
};

export default WelcomePage;
