import React from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image'; // Importar el componente Image de Next.js
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Course } from "@/mockCourses/Courses";
import { deleteCourseFromFirebase } from '@/firebase/firebaseService';

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

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const CourseCardContainer = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 300px; /* Ancho fijo */
  height: 200px; /* Alto fijo */
  position: relative; /* Añadir posición relativa para el contenedor */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CourseHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
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
  padding: 7px;
  font-size: 1.2rem;
  font-weight: 600;
  overflow: hidden; /* Asegurar que el título no se desborde */
  text-overflow: ellipsis;
  white-space: normal; /* Permitir que el texto pase a la siguiente línea */
  max-width: 200px; /* Ajustar el ancho máximo del título */
  max-height: 71px;
`;

const CourseDuration = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #666;
  display: flex;
  align-items: center;
`;

const ProgressContainer = styled.div`
  width: 100%;
  margin-top: auto; /* Empujar el contenedor de progreso hacia la parte inferior */
  display: flex;
  flex-direction: column;
`;

const ProgressBar = styled.div`
  background-color: #eee;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  margin-top: 10px;
  overflow: hidden; /* Evitar el desbordamiento de la barra de progreso */
`;

const FilledProgressBar = styled.div<{ progress: number }>`
  background-color: #000;
  width: ${({ progress }) => progress}%;
  height: 100%;
  border-radius: 5px;
`;

const ProgressText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-top: 2px;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  color: #000; /* Cambiar el color a negro */
  cursor: pointer;
  position: absolute; /* Posicionar absolutamente */
  padding: 2px;
  top: 10px; /* Ajustar la posición desde la parte superior */
  right: 10px; /* Ajustar la posición desde la derecha */
`;

const colors = ['#FFD5E5', '#FFECB3', '#C8E6C9', '#BBDEFB', '#D1C4E9'];

const getRandomColor = (prevColor: string | null): string => {
  let newColor = '';
  while (newColor === prevColor || newColor === '') {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  }
  return newColor;
};

interface CourseCardProps {
  course: Course;
  onDelete: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onDelete }) => {
  const router = useRouter();
  const [bgColor, setBgColor] = React.useState<string>('');

  React.useEffect(() => {
    setBgColor(getRandomColor(null));
  }, []);

  const handleClick = () => {
    router.push({
      pathname: '/CourseDetailPage',
      query: { state: JSON.stringify(course) }
    });
  };

  const handleDeleteClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    const isDeleted = await deleteCourseFromFirebase(course.id); // Usar el ID del curso
    if (isDeleted) {
      onDelete(course);
    } else {
      alert('No se pudo eliminar el curso');
    }
  };

  const progress = course.progress ?? 0;

  return (
    <CourseCardContainer bgColor={bgColor} onClick={handleClick}>
      <DeleteIcon icon={faTimes} onClick={handleDeleteClick} />
      <CourseHeader>
        <CourseInfo>
          <Image src={course.icon} alt="Course Image" width={70} height={70} style={{ borderRadius: '10px', marginRight: '10px' }} />
          <CourseDetails>
            <CourseTitle>{course.name}</CourseTitle>
            <CourseDuration>
              <FontAwesomeIcon icon={faClock} style={{ marginRight: '5px', color: "black" }} />
              {course.time}
            </CourseDuration>
          </CourseDetails>
        </CourseInfo>
      </CourseHeader>
      <ProgressContainer>
        <ProgressText>{`${progress}%`}</ProgressText>
        <ProgressBar>
          <FilledProgressBar progress={progress} />
        </ProgressBar>
      </ProgressContainer>
    </CourseCardContainer>
  );
};

export default CourseCard;
