import { notFound } from 'next/navigation';
import { getCourseWithData, mockJams } from '@/lib/mockData';
import { CourseDetail } from '@/components/CourseDetail';

interface CoursePageProps {
  params: {
    id: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const courseData = getCourseWithData(params.id);
  
  if (!courseData) {
    notFound();
  }

  const { course, jam, tutorial } = courseData;

  if (!jam) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CourseDetail 
        course={course}
        jam={jam}
        tutorial={tutorial}
      />
    </div>
  );
}

// Generate static params for all courses (for static generation)
export async function generateStaticParams() {
  const { mockCourses } = await import('@/lib/mockData');
  
  return mockCourses.map((course) => ({
    id: course.id,
  }));
}
