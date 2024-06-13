import { NextResponse, NextRequest } from 'next/server';
import connect from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const mongoose = await connect();
        const db = mongoose.connection.db;
        const projects = await db.collection('projects').find({}).toArray();
        return NextResponse.json(projects);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
