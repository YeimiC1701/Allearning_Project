import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@/components/Header/Header";
import CourseCard from "@/components/CourseCard/CourseCard";
import { getCoursesFromFirebase, setCurrentCourseInFirebase, deleteCourseFromFirebase } from "@/firebase/firebaseService";
import { Course } from "@/mockCourses/Courses";
import { useCurrentCourse } from "@/components/CurrentCourseContext/CurrentCourseContext";

const CourseDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CourseGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const AppContainer = styled.div`
  display: flex;
  padding-left: 50px; /* Espacio para el sidebar */
  background-image: url('https://i.pinimg.com/736x/db/a4/b3/dba4b3fad38764fa8c07a5e44cbd13e0.jpg');
  background-repeat: repeat; /* Repite la imagen en ambas direcciones */
  background-position: top left; /* Alinea la imagen al inicio */
  height: 100vh; /* Asegura que cubra toda la ventana */
`;

const CourseDetails: React.FC = () => {
  const { currentCourse, setCurrentCourse, refreshCurrentCourse } = useCurrentCourse();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchText, setSearchText] = useState<string>(''); // Estado para el texto de búsqueda

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await getCoursesFromFirebase();
      setCourses(fetchedCourses);
    };

    fetchCourses();
  }, []);

  const handleCourseClick = async (course: Course) => {
    await setCurrentCourseInFirebase(course);
    setCurrentCourse(course);
  };

  // Filtra los cursos en función del texto de búsqueda
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchText.toLowerCase()) ||
    course.author.toLowerCase().includes(searchText.toLowerCase())
  );

  const deleteCourse = async (course: Course) => {
    const success = await deleteCourseFromFirebase(course.id);
    if (success) {
      setCourses(prevCourses => prevCourses.filter(c => c.id !== course.id));
      if (currentCourse?.id === course.id) {
        setCurrentCourse(null);
        await refreshCurrentCourse();
      }
    }
  };

  return (
    <AppContainer>
      <CourseDetailsContainer>
        <Header onSearch={setSearchText} />
        <CourseGrid>
          {filteredCourses.map((course, index) => (
            <div key={index} onClick={() => handleCourseClick(course)}>
              <CourseCard course={course} onDelete={deleteCourse} />
            </div>
          ))}
        </CourseGrid>
      </CourseDetailsContainer>
    </AppContainer>
  );
};

export default CourseDetails;
