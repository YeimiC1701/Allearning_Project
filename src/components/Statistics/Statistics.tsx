import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { getUserStatsFromFirebase } from '@/firebase/firebaseService';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const StatisticsContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StatisticsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StatsNumbers = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StatBox = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  flex: 1;
  margin: 0 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const StatText = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Learning Hours',
      data: [1, 2.5, 3, 2.2, 2, 4, 2],
      borderColor: 'black',
      fill: false,
    },
  ],
};

const Statistics: React.FC = () => {
  const [completedCourses, setCompletedCourses] = useState(0);
  const [inProgressCourses, setInProgressCourses] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await getUserStatsFromFirebase();
      if (stats) {
        setCompletedCourses(stats.completedCourses);
        setInProgressCourses(stats.inProgressCourses);
      }
    };

    fetchStats();
  }, []);

  return (
    <StatisticsContainer>
      <StatisticsHeader>
        <div>Estadísticas</div>
        <div>Mensuales</div>
      </StatisticsHeader>
      <StatsNumbers>
        <StatBox>
          <StatNumber>{completedCourses}</StatNumber>
          <StatText>Cursos completados</StatText>
        </StatBox>
        <StatBox>
          <StatNumber>{inProgressCourses}</StatNumber>
          <StatText>Cursos en progreso</StatText>
        </StatBox>
      </StatsNumbers>
      <Line data={data} />
    </StatisticsContainer>
  );
};

export default Statistics;
