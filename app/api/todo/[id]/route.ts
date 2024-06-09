import prisma from '../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';


export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const { id } = body;

        await prisma.todo.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}


export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id } = body;
        const { x, y, z } = body.position;
        const updatedAt = new Date().toISOString();

        const updatedTodo = await prisma.todo.update({
            where: { id: Number(id) },
            data: { position: { x, y, z }, updatedAt },
        });

        return NextResponse.json({ updatedTodo }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function PATCH(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const { id, status, updatedAt } = body;
        
        const updatedTodo = await prisma.todo.update({
            where: { id: Number(id) },
            data: { status, updatedAt },
        });

        return NextResponse.json({ updatedTodo }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
