// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcrypt";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, email, password, role } = body;

//     if (!email || !password || !role) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 409 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         role: role.toUpperCase(), // "STUDENT" or "INSTRUCTOR" er jonne
//       },
//     });

//     return NextResponse.json(
//       { message: "User created successfully", user },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("[REGISTER_ERROR]", error);
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const allowedRoles = ["STUDENT", "INSTRUCTOR"];
    const normalizedRole = role.toUpperCase();

    if (!allowedRoles.includes(normalizedRole)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: normalizedRole,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
