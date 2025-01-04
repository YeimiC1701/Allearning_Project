import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  display: flex;
  height: 100vh;
  background: url('/fondo.jpeg') no-repeat center center/cover;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5); /* Adding a dark overlay */
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: white;
`;

const TransparentImage = styled.img`
  position: absolute;
  top: 20px;  // Cambiar bottom a top
  right: 20px;
  width: 300px;
  height: auto; /* Adjust the opacity as needed */
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin: 0;
  text-align: center;
`;

const SubHeading = styled.p`
  margin: 20px 0;
  text-align: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  z-index: 1; /* Ensure the form is above the image */
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: none;
  border-bottom: 2px solid #ccc;
  border-radius: 0;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #0070f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #00408d;
    transform: translateY(1px);
  }
`;

const LinkButton = styled.button`
  margin-top: 10px;
  background: none;
  border: none;
  color: #0070f3;
  cursor: pointer;
  text-decoration: underline;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0;
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Correo no válido');
      return;
    }

    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial');
      return;
    }
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user.emailVerified);
          if(!user.emailVerified){
            setError('Por favor verifica tu correo electrónico');
            return;
          }
          setError('');
          router.push('/');
        });
    } catch (error) {
      setError('La contraseña y el correo no coinciden. Inténtalo de nuevo.');
    }
  };

  return (
    <BackgroundContainer>
      <LeftPanel>
        <Heading>Bienvenido a Allearning</Heading>
        <SubHeading>
        La plataforma web donde los niños pueden aprender ingles de manera interactiva y divertida.
        </SubHeading>
      </LeftPanel>
      <RightPanel>
        <TransparentImage src="/monstruo-login.jpg" alt="Transparent Image" />
        <LoginForm onSubmit={handleSubmit}>
          <Title>Inicia sesión</Title>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo de usuario"
            required
          />
          {error === 'Correo no válido' && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          {error === 'La contraseña y el correo no coinciden. Inténtalo de nuevo.' && <ErrorMessage>{error}</ErrorMessage>}
          {error.includes('La contraseña debe tener al menos') && <ErrorMessage>{error}</ErrorMessage>}
          {error === 'Por favor verifica tu correo electrónico' && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Enviar</Button>
          <LinkButton onClick={() => router.push('/RegisterPage')}>¿No tienes cuenta? Regístrate</LinkButton>
          <LinkButton onClick={() => router.push('/RestPassword')}>¿Olvidaste tu contraseña?</LinkButton>
        </LoginForm>
      </RightPanel>
    </BackgroundContainer>
  );
};

export default LoginPage;
