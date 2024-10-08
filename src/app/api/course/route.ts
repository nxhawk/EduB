import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/options";
import { getErrorMessage } from "@/utils/helper";
import { createCourse, getNewestCourses } from "@/models/course";
import { type IChapter } from "@/types/course";

export async function GET() {
  try {
    const newest_courses = await getNewestCourses();
    return NextResponse.json({ message: "success", data: newest_courses });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error: ${getErrorMessage(error)}` },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user && session?.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const { title, brief, detail, topicId, price, discount, photo, curriculum } = await request.json();

    if (!title || !brief || !detail) {
      return NextResponse.json({ message: "Missing title, brief description or detail description" }, { status: 400 });
    }
    if (!topicId) {
      return NextResponse.json({ message: "Missing topic" }, { status: 400 });
    }
    if (price < 0 || discount < 0 || discount > 100) {
      return NextResponse.json({ message: "Price or discount invalid" }, { status: 400 });
    }
    if (!curriculum || curriculum.length < 0) {
      return NextResponse.json({ message: "Curriculum must have" }, { status: 400 });
    }

    // add new course
    const authorId = session.user.id;
    const course = createCourse(
      title as string,
      brief as string,
      detail as string,
      topicId as string,
      price as number,
      discount as number,
      photo as string[],
      curriculum as IChapter[],
      authorId,
    );

    return NextResponse.json({ message: "success", data: course });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: `Invalid JSON: ${getErrorMessage(error)}` }, { status: 400 });
    }

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: "Course already exists" }, { status: 400 });
      }
    }

    return NextResponse.json(
      { message: `Internal Server Error: ${getErrorMessage(error)}` },
      {
        status: 500,
      },
    );
  }
}
