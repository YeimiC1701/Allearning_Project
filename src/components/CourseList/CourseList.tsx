import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { courses, Course } from "@/mockCourses/Courses";
import { addCourseToFirebase } from "@/firebase/firebaseService";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  padding: 20px;
`;

const HeaderContainer = styled.div`
  flex: 0 0 auto;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const SidebarContainer = styled.div`
  flex: 0 0 80px;
  background-color: #2C3E50;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-radius: 20px;
  position: fixed;
  top: 20px;
  left: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CoursesSectionContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const CoursesContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CoursesListContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  padding-right: 20px;
`;

const CourseItem = styled.div<{ bgColor: string }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 20px;
  background-color: ${({ bgColor }) => bgColor};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const CourseInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CourseDetails = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 600px; /* O el tamaño fijo que prefieras */
  max-width: 600px; /* Esto asegura que no crezca más allá de 200px */
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

const CourseStatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CourseStats = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #000;
  width: 100%;
`;

const CourseStat = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const ViewButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  max-width: min-content; /* Ajusta este valor según sea necesario */
  margin-left: 10px; /* Añadir si hay necesidad de espaciado */
`;

const CourseContent = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-top: 2px solid #000;
`;

const LessonItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
    border-radius: 5px;
  }
`;

const colors = ['#FFD5E5', '#FFECB3', '#C8E6C9', '#BBDEFB', '#D1C4E9'];

const getRandomColor = (prevColor: string | null): string => {
  let newColor = '';
  while (newColor === prevColor || newColor === '') {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  }
  return newColor;
};

interface CoursesListProps {
  searchText: string;
}

const CoursesList: React.FC<CoursesListProps> = ({ searchText }) => {
  const [courseColors, setCourseColors] = useState<string[]>([]);
  const [expandedCourses, setExpandedCourses] = useState<number[]>([]);

  useEffect(() => {
    const assignedColors: string[] = [];
    courses.forEach((_, index) => {
      const prevColor = index > 0 ? assignedColors[index - 1] : null;
      assignedColors.push(getRandomColor(prevColor));
    });
    setCourseColors(assignedColors);
  }, []);

  const toggleCourse = (index: number) => {
    setExpandedCourses(prevState =>
      prevState.includes(index)
        ? prevState.filter(i => i !== index)
        : [...prevState, index]
    );
  };

  const addCourse = async (course: Course, event: React.MouseEvent) => {
    event.stopPropagation();
    const isAdded = await addCourseToFirebase(course);
    if (isAdded) {
      alert('Curso agregado exitosamente');
    } else {
      alert('El curso ya está registrado');
    }
  };

  // Filtra los cursos en función del texto de búsqueda
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchText.toLowerCase()) ||
    course.author.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <MainContainer>
      <HeaderContainer>
        {/* Aquí va tu header */}
      </HeaderContainer>
      <ContentContainer>
        <SidebarContainer>
          {/* Aquí va tu sidebar */}
        </SidebarContainer>
        <CoursesSectionContainer>
          <CoursesContainer>
            <Title>Cursos</Title>
            <CoursesListContainer>
              {filteredCourses.map((course, index) => (
                <CourseItem key={course.id} bgColor={courseColors[index]}>
                  <CourseHeader onClick={() => toggleCourse(index)}>
                    <CourseInfo>
                      <Image src={course.icon} alt="Course Icon" width={50} height={50} style={{ borderRadius: '10px', marginRight: '20px' }} />
                      <CourseDetails>
                        <CourseTitle>{course.name}</CourseTitle>
                        <CourseAuthor>{course.author}</CourseAuthor>
                      </CourseDetails>
                    </CourseInfo>
                    <CourseStatsContainer>
                      <CourseStats>
                        <CourseStat>
                          <FontAwesomeIcon icon={faClock} />
                          <span style={{ marginLeft: '5px' }}>{course.time}</span>
                        </CourseStat>
                      </CourseStats>
                      <ViewButton onClick={(event) => addCourse(course, event)}>Agregar curso</ViewButton>
                      <FontAwesomeIcon icon={expandedCourses.includes(index) ? faChevronUp : faChevronDown} style={{ marginLeft: '12px' }}/>
                    </CourseStatsContainer>
                  </CourseHeader>
                  {expandedCourses.includes(index) && (
                    <CourseContent>
                      {course.temas.map((tema, idx) => (
                        <LessonItem key={idx}>
                          <span>{tema.nombre}</span>
                          <span>{tema.duracion}</span>
                        </LessonItem>
                      ))}
                    </CourseContent>
                  )}
                </CourseItem>
              ))}
            </CoursesListContainer>
          </CoursesContainer>
        </CoursesSectionContainer>
      </ContentContainer>
    </MainContainer>
  );
};

export default CoursesList;
