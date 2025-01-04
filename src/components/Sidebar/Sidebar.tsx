import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGraduationCap, faUser, faSignOutAlt, faBook, faCode, faGamepad, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

const SidebarContainer = styled.div`
  width: 80px;
  background-color: #2C3E50;
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-radius: 20px;
  position: fixed;
  top: 20px;
  left: 20px;
  box-shadow: 15px 4px 8px rgba(0, 0, 0, 0.1);
  justify-content: space-around; /* Distributes the space between the items */
`;

const IconWrapper = styled.div`
  margin: 20px 0;
  cursor: pointer;
  font-size: 1.5rem;
  transition: transform 0.3s ease, fill 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const Logo = styled.img`
  width: 70px;
  height: 54px;
  cursor: pointer;

  transition: transform 0.3s ease, fill 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleClick = (path: string): void => {
    router.push(path);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      router.push('/Bienvenida');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SidebarContainer>
      <Logo src="logo.png" alt="Logo" onClick={() => handleClick('/')}/>
      <IconWrapper onClick={() => handleClick('/')}>
        <FontAwesomeIcon icon={faHome} />
      </IconWrapper>
      <IconWrapper onClick={() => handleClick('/courses')}>
        <FontAwesomeIcon icon={faGraduationCap} />
      </IconWrapper>
      <IconWrapper onClick={() => handleClick('/profile')}>
        <FontAwesomeIcon icon={faUser} />
      </IconWrapper>
      <IconWrapper onClick={() => window.location.href = '/kids/indexKid.html'}>
        <FontAwesomeIcon icon={faGamepad} />
      </IconWrapper>
      <IconWrapper onClick={() => handleClick('/materials')}>
        <FontAwesomeIcon icon={faBook} />
      </IconWrapper>
      <IconWrapper onClick={() => handleClick('/kids/CERT-AL.html')}>
        <FontAwesomeIcon icon={faCertificate} />
      </IconWrapper>
      <IconWrapper onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </IconWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
