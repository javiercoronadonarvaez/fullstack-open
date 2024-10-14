export interface CourseName {
  courseName: string;
}

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courses: CoursePart[];
}
