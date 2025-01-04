import React from 'react';
import styled from 'styled-components';
import Sidebar from '@/components/Sidebar/Sidebar';

const PageContainer = styled.div`
  display: flex;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden; /* Prevent overall page scroll */
`;

const MainContent = styled.div`
  flex-grow: 1;
  margin-left: 90px; /* Adjust margin to account for sidebar width */
  padding: 20px;
  height: 100vh;
  overflow-y: auto; /* Enable scrolling for main content */
  display: flex;
  flex-direction: column;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PageContainer>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </PageContainer>
  );
};

export default Layout;
