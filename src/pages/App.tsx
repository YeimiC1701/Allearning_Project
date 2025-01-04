import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import CoursesList from '@/components/CourseList/CourseList';
import Statistics from '@/components/Statistics/Statistics';
import CurrentCourse from '@/components/CurrentCourse/CurrentCourse';
import { GlobalStyles } from '@/styles/GlobalStyles';
import PremiumAd from '@/components/PremiumAd/PremiumAd';
import { CurrentCourseProvider } from '@/components/CurrentCourseContext/CurrentCourseContext';


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-image: url('https://i.pinimg.com/736x/db/a4/b3/dba4b3fad38764fa8c07a5e44cbd13e0.jpg');
  background-repeat: repeat; /* Repite la imagen en ambas direcciones */
  background-position: top left; /* Alinea la imagen al inicio */
  min-height: 150vh; /* Mantiene la altura mínima del contenedor */
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  margin-top: 20px;
  height: calc(100vh - 100px);
`;

const LeftContent = styled.div`
  flex: 2;
`;

const RightContent = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const App: React.FC = () => {
  const [searchText, setSearchText] = useState<string>(''); // Estado para el texto de búsqueda

  return (
    <CurrentCourseProvider>
      <GlobalStyles />
      <AppContainer>
        <Sidebar />
        <ContentContainer>
          <Header onSearch={setSearchText} /> {/* Pasa setSearchText como prop */}
          <MainContent>
            <LeftContent>
              <CurrentCourse />
              <CoursesList searchText={searchText} /> {/* Pasa searchText como prop */}
            </LeftContent>
            <RightContent>
              <Statistics />
              <PremiumAd />
            </RightContent>
          </MainContent>
        </ContentContainer>
      </AppContainer>
    </CurrentCourseProvider>
  );
};

export default App;
