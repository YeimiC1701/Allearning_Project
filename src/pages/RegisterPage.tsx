import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/firebase';
import { useRouter } from 'next/router';
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

const FixedImage = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  height: auto;
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

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  margin: 5px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
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

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false); // Estado para mostrar el mensaje de verificación
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return re.test(password);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Correo no válido');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluyendo al menos un número, una letra mayúscula o minúscula, y un carácter especial.');
      return;
    }

    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, 'users', user.uid), {
        name,
        email,
        stats: {
          completedCourses: 0,
          inProgressCourses: 0,
        }
      });

      await sendEmailVerification(user); // Enviar correo de verificación

      setSuccessMessage('Verifica tu correo electrónico con el e-mail que enviamos e inicia sesión con tu nueva cuenta');
      setShowVerificationMessage(true);

      // Limpiar los campos después de enviar
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      console.error('Error registering:', error);
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
        <FixedImage src="/monstruo-registro.jpg" alt="Fixed Image" />
        <RegisterForm onSubmit={handleRegister}>
          <Title>Registro</Title>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            required
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
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
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Contraseña"
            required
          />
          {error === 'Las contraseñas no coinciden' && <ErrorMessage>{error}</ErrorMessage>}
          {error.includes('La contraseña debe tener al menos') && <ErrorMessage>{error}</ErrorMessage>}
          {showVerificationMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          <Button type="submit">Enviar</Button>
          <LinkButton onClick={() => router.push('/LoginPage')}>¿Ya tienes cuenta? Inicia sesión</LinkButton>
        </RegisterForm>
      </RightPanel>
    </BackgroundContainer>
  );
};

export default RegisterPage;
