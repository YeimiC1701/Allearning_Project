import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/router';
import { Course, SubLesson } from "@/mockCourses/Courses";
import MultipleChoice from "@/components/Questions/MultipleChoise";
import TrueFalse from "@/components/Questions/TrueFalse";
import OpenEnded from "@/components/Questions/OpenEnded";
import FillInTheBlank from "@/components/Questions/FillInTheBlank";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { updateCourseProgress, updateCourseCompletion, setCurrentCourseInFirebase } from '@/firebase/firebaseService';
import { useCurrentCourse } from '@/components/CurrentCourseContext/CurrentCourseContext';

const slideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    max-height: 1000px;
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    max-height: 1000px;
    opacity: 1;
    transform: translateY(0);
  }
  to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f7fa;
`;

const Sidebar = styled.div`
  flex: 0 0 300px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  border-right: 2px solid #ddd;
`;

const Content = styled.div`
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  background-color: #f5f7fa;
  border-radius: 20px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SubTopic = styled.div`
  margin-bottom: 30px;
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6f0ff;
  }
`;

const AccordionContent = styled.div<{ expanded: boolean }>`
  max-height: ${({ expanded }) => (expanded ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  animation: ${({ expanded }) => (expanded ? slideDown : slideUp)} 0.3s ease;
`;

const LessonItem = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e6f0ff;
    transform: translateX(10px);
  }
`;

const LessonTitle = styled.h3`
  font-size: 1.0rem;
  margin: 0;
  color: #34495e;
`;

const LessonContent = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  color: #2c3e50; /* Un tono más oscuro */
  font-weight: bold; /* Aplicar negritas */
  padding: 0 30px; /* Aumenta el padding lateral */
  white-space: pre-line; /* Para que los saltos de línea \n se respeten */
`;

const ExerciseItem = styled.div`
  margin-bottom: 25px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  font-size: 1.5rem;
  color: #34495e;
  margin-top: 40px;
`;

const SidebarTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
`;

const LessonSubTitle = styled.h4`
  font-size: 1.3rem;
  color: #34495e;
  margin-bottom: 10px;
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  color: #95a5a6;
  animation: ${fadeIn} 0.5s ease;
`;

const PlaceholderTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const PlaceholderImage = styled.img`
  max-width: 500px;
  margin-bottom: 20px;
  animation: ${bounce} 2s infinite;
`;

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;
  border-radius: 10px;
  margin-bottom: 20px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const CourseDetailPage: React.FC = () => {
  const router = useRouter();
  const { state } = router.query;
  const { currentCourse, setCurrentCourse } = useCurrentCourse();

  let course: Course | null = null;
  if (state) {
    course = JSON.parse(state as string);
  }

  const [selectedSubLesson, setSelectedSubLesson] = useState<SubLesson | null>(null);
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setExpandedIndices(prevIndices =>
      prevIndices.includes(index)
        ? prevIndices.filter(i => i !== index)
        : [...prevIndices, index]
    );
  };

  const handleSubLessonClick = async (subLesson: SubLesson, temaIndex: number, subLessonIndex: number) => {
    setSelectedSubLesson(subLesson);
    if (course) {
      // Calcular el progreso total basado en la lección seleccionada
      const totalSubLessons = course.temas.reduce((sum, tema) => sum + tema.subLessons.length, 0);
      const completedSubLessons = temaIndex * course.temas[temaIndex].subLessons.length + subLessonIndex + 1;
      const progress = (completedSubLessons / totalSubLessons) * 100;

      // Actualizar el progreso del curso
      await updateCourseProgress(course.id, progress);

      // Marcar como completado si el progreso es 100%
      if (progress === 100) {
        await updateCourseCompletion(course.id, true);
      }

      // Actualizar el curso actual en el estado global
      const updatedCourse = { ...course, progress, completed: progress === 100 };
      await setCurrentCourseInFirebase(updatedCourse);
      setCurrentCourse(updatedCourse);
    }
  };

  if (!course) {
    return <div>Cargando...</div>;
  }

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>{course.name}</SidebarTitle>
        {course.temas.map((tema, temaIndex) => (
          <SubTopic key={temaIndex}>
            <AccordionHeader onClick={() => toggleAccordion(temaIndex)}>
              <LessonSubTitle>{tema.nombre}</LessonSubTitle>
              <FontAwesomeIcon icon={expandedIndices.includes(temaIndex) ? faChevronUp : faChevronDown} />
            </AccordionHeader>
            <AccordionContent expanded={expandedIndices.includes(temaIndex)}>
              {tema.subLessons.map((subLesson, subLessonIndex) => (
                <LessonItem key={subLessonIndex} onClick={() => handleSubLessonClick(subLesson, temaIndex, subLessonIndex)}>
                  <LessonTitle>{subLesson.title}</LessonTitle>
                </LessonItem>
              ))}
            </AccordionContent>
          </SubTopic>
        ))}
      </Sidebar>
      <Content>
        {selectedSubLesson ? (
          selectedSubLesson.isVideoContent ? (
            <>
              <Title>{selectedSubLesson.title}</Title>
              <VideoContainer>
                <iframe
                  src={selectedSubLesson.videoUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoContainer>
            </>
          ) : (
            <>
              <Title>{selectedSubLesson.title}</Title>

              {/* Renderizar la imagen si está disponible */}
              {selectedSubLesson.image && (
                <img src={selectedSubLesson.image} alt={selectedSubLesson.title} style={{ width: '60%', height: 'auto', marginBottom: '20px', display: 'block', margin: '0 auto' }} />
              )}

              <LessonContent>{selectedSubLesson.content}</LessonContent>
              <SubTitle>Ejercicios</SubTitle>
              {selectedSubLesson.exercises.map((exercise, idx) => (
                <ExerciseItem key={idx}>
                  {exercise.type === 'multiple-choice' && <MultipleChoice exercise={exercise} />}
                  {exercise.type === 'true-false' && <TrueFalse exercise={exercise} />}
                  {exercise.type === 'open-ended' && <OpenEnded exercise={exercise} />}
                  {exercise.type === 'fill-in-the-blank' && <FillInTheBlank exercise={exercise} />}
                </ExerciseItem>
              ))}
            </>
          )
        ) : (
          <Placeholder>
            <PlaceholderImage src="monstruo_2.png" alt="Selecciona una lección" />
            <PlaceholderTitle>Selecciona una lección para ver el contenido</PlaceholderTitle>
          </Placeholder>
        )}
      </Content>
    </Container>
  );
};

export default CourseDetailPage;
