import { NextRequest, NextResponse } from 'next/server';
import { courseStore } from '@/lib/courseStore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const techStack = searchParams.get('techStack');
    const difficulty = searchParams.get('difficulty');

    let courses = courseStore.getAllCourses();

    // Filter by tech stack if provided
    if (techStack && techStack !== '') {
      courses = courseStore.getCoursesByTechStack(techStack);
    }

    // Filter by difficulty if provided
    if (difficulty && difficulty !== '') {
      courses = courses.filter(course => course.difficulty === difficulty);
    }

    return NextResponse.json({
      success: true,
      courses: courses,
      total: courses.length
    });

  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
