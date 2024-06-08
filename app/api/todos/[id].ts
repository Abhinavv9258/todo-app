import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { position, status } = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { position, status },
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    await prisma.todo.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
