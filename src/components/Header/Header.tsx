// Header.tsx
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { userState } from '@/atoms/userState';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #F9F9F9;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GreetingSection = styled.div`
  display: flex;
  align-items: center;
`;

const GreetingText = styled.div`
  margin-right: 20px;
`;

const Greeting = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
`;

const SubGreeting = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`;

const HeaderImage = styled.img`
  width: 150px;
  height: 150px;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 16px;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  padding: 5px;
  font-size: 1rem;
  flex-grow: 1;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  margin-right: 15px;
  cursor: pointer;
`;

const IconSection = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`;

interface HeaderProps {
  onSearch: (searchText: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const user = useRecoilValue(userState);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <HeaderContainer>
      <GreetingSection>
        <GreetingText>
          <Greeting>Hola {user.name}!</Greeting>
          <SubGreeting>Que gusto verte.</SubGreeting>
        </GreetingText>
        <HeaderImage src="monstruo.png" alt="Header Image" />
      </GreetingSection>
      <SearchSection>
        <SearchContainer>
          <SearchIcon icon={faSearch} />
          <SearchInput type="text" placeholder="Buscando..." onChange={handleSearchChange} />
        </SearchContainer>
        <IconSection>
          <UserImage
            src={user.profileImage}
            alt="User Avatar"
            style={{ marginLeft: '25px', marginRight: '20px' }}
            onClick={handleProfileClick}
          />
        </IconSection>
      </SearchSection>
    </HeaderContainer>
  );
};

export default Header;
