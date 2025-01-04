import { firestore, auth } from './firebase';
import { collection, doc, addDoc, getDocs, setDoc, getDoc, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
import { Course } from '@/mockCourses/Courses';

export const addCourseToFirebase = async (course: Course) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      const coursesCollectionRef = collection(userDocRef, 'courses');
      const q = query(coursesCollectionRef, where("name", "==", course.name));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        console.log('El curso ya está registrado');
        return false;
      }
      await addDoc(coursesCollectionRef, { ...course, progress: 0, completed: false });
      await updateUserStats(user.uid);
      return true;
    } catch (error) {
      console.error('Error adding course: ', error);
      return false;
    }
  } else {
    console.log('No user is signed in');
    return false;
  }
};

export const getCoursesFromFirebase = async (): Promise<Course[]> => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      const coursesCollectionRef = collection(userDocRef, 'courses');
      const querySnapshot = await getDocs(coursesCollectionRef);
      const userCourses = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Course));
      return userCourses;
    } catch (error) {
      console.error('Error fetching courses: ', error);
      return [];
    }
  } else {
    console.log('No user is signed in');
    return [];
  }
};

export const updateUserStats = async (userId: string) => {
  try {
    const userDocRef = doc(firestore, 'users', userId);
    const coursesCollectionRef = collection(userDocRef, 'courses');
    const querySnapshot = await getDocs(coursesCollectionRef);

    const courses = querySnapshot.docs.map(doc => doc.data() as Course);
    const completedCourses = courses.filter(course => course.completed).length;
    const inProgressCourses = courses.filter(course => (course.progress ?? 0) > 0 && (course.progress ?? 0) < 100).length;

    await updateDoc(userDocRef, {
      stats: {
        completedCourses,
        inProgressCourses,
      },
    });
  } catch (error) {
    console.error('Error updating stats: ', error);
  }
};

export const getUserStatsFromFirebase = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.stats || { completedCourses: 0, inProgressCourses: 0 };
    } else {
      console.log('User document not found');
      return null;
    }
  } else {
    console.log('No user is signed in');
    return null;
  }
};


export const setCurrentCourseInFirebase = async (course: Course) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, { currentCourse: course }, { merge: true });
    } catch (error) {
      console.error('Error setting current course: ', error);
    }
  } else {
    console.log('No user is signed in');
  }
};

export const getCurrentCourseFromFirebase = async (): Promise<Course | null> => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.currentCourse as Course || null;
    } else {
      console.log('User document not found');
      return null;
    }
  } else {
    console.log('No user is signed in');
    return null;
  }
};

export const deleteCourseFromFirebase = async (courseId: string) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      const courseDocRef = doc(userDocRef, 'courses', courseId);
      await deleteDoc(courseDocRef);
      const currentCourse = await getCurrentCourseFromFirebase();
      if (currentCourse && currentCourse.id === courseId) {
        await deleteCurrentCourseFromFirebase();
      }
      await updateUserStats(user.uid);
      return true;
    } catch (error) {
      console.error('Error deleting course: ', error);
      return false;
    }
  } else {
    console.log('No user is signed in');
    return false;
  }
};

export const deleteCurrentCourseFromFirebase = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, { currentCourse: null }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error deleting current course: ', error);
      return false;
    }
  } else {
    console.log('No user is signed in');
    return false;
  }
};

export const updateCourseProgress = async (courseId: string, progress: number) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      const courseDocRef = doc(userDocRef, 'courses', courseId);
      await updateDoc(courseDocRef, { progress });
      await updateUserStats(user.uid);
      return true;
    } catch (error) {
      console.error('Error updating course progress: ', error);
      return false;
    }
  } else {
    console.log('No user is signed in');
    return false;
  }
};

export const updateCourseCompletion = async (courseId: string, completed: boolean) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      const courseDocRef = doc(userDocRef, 'courses', courseId);
      await updateDoc(courseDocRef, { completed });
      await updateUserStats(user.uid);
      return true;
    } catch (error) {
      console.error('Error updating course completion: ', error);
      return false;
    }
  } else {
    console.log('No user is signed in');
    return false;
  }
};
