import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useRouter } from 'next/router';
import { useCurrentCourse } from '@/components/CurrentCourseContext/CurrentCourseContext';
import Image from 'next/image';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CurrentCourseContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
  justify-content: space-between;
  border-radius: 20px;
  box-shadow: 10px 10px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  animation: ${fadeIn} 0.5s ease;
`;

const CourseInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CourseDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CourseTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const CourseAuthor = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #666;
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

const CurrentCourse: React.FC = () => {
  const { currentCourse, refreshCurrentCourse, clearCurrentCourse } = useCurrentCourse();
  const router = useRouter();

  useEffect(() => {
    refreshCurrentCourse();
  }, [refreshCurrentCourse]);

  useEffect(() => {
    if (currentCourse && currentCourse.progress === 100) {
      clearCurrentCourse();
    }
  }, [currentCourse, clearCurrentCourse]);

  if (!currentCourse) {
    return null;
  }

  const percentage = currentCourse.progress ?? 0;

  const handleContinue = async () => {
    await refreshCurrentCourse();
    router.push({
      pathname: '/CourseDetailPage',
      query: { state: JSON.stringify(currentCourse) },
    });
  };

  return (
    <CurrentCourseContainer>
      <CourseInfo>
        <Image src={currentCourse.icon} alt="Course Icon" width={50} height={50} style={{ borderRadius: '10px', marginRight: '20px' }} />
        <CourseDetails>
          <CourseTitle>{currentCourse.name}</CourseTitle>
          <CourseAuthor>{currentCourse.author}</CourseAuthor>
        </CourseDetails>
      </CourseInfo>
      <ProgressContainer>
        <ProgressWrapper>
          <CircularProgressbar
            value={percentage}
            text={`${Math.round(percentage)}%`}
            styles={buildStyles({
              textColor: '#000',
              pathColor: '#000',
              trailColor: '#fff',
            })}
          />
        </ProgressWrapper>
        <Button onClick={handleContinue}>Continuar</Button>
      </ProgressContainer>
    </CurrentCourseContainer>
  );
};

export default CurrentCourse;
