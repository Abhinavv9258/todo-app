import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // try {
  //   const todos = await prisma.todo.findMany();
  //   res.status(200).json(todos);
  // } catch (error) {
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
  res.send("hello");
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, description, position, status } = req.body;
    console.log('Title:', title);
    console.log('description:', description);

    const newTodo = await prisma.todo.create({
      data: { title, description, position, status },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    // console.error('Error processing POST request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
