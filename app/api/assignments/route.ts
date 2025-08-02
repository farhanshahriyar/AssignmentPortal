import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const assignment = await prisma.assignment.create({
    data: {
      title: body.title,
      description: body.description,
      deadline: new Date(body.deadline),
      createdById: body.instructorId,
    },
  });

  return Response.json(assignment);
}
