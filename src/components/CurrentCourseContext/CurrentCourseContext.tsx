import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentCourseFromFirebase, deleteCurrentCourseFromFirebase } from '@/firebase/firebaseService';
import { Course } from '@/mockCourses/Courses';

interface CurrentCourseContextProps {
  currentCourse: Course | null;
  setCurrentCourse: (course: Course | null) => void;
  refreshCurrentCourse: () => void;
  clearCurrentCourse: () => void;
}

const CurrentCourseContext = createContext<CurrentCourseContextProps>({
  currentCourse: null,
  setCurrentCourse: () => {},
  refreshCurrentCourse: () => {},
  clearCurrentCourse: () => {},
});

export const useCurrentCourse = () => useContext(CurrentCourseContext);

export const CurrentCourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  const refreshCurrentCourse = async () => {
    const course = await getCurrentCourseFromFirebase();
    setCurrentCourse(course);
  };

  const clearCurrentCourse = async () => {
    await deleteCurrentCourseFromFirebase();
    setCurrentCourse(null);
  };

  useEffect(() => {
    refreshCurrentCourse();
  }, []);

  return (
    <CurrentCourseContext.Provider value={{ currentCourse, setCurrentCourse, refreshCurrentCourse, clearCurrentCourse }}>
      {children}
    </CurrentCourseContext.Provider>
  );
};
