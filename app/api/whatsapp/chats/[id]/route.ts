import { NextResponse } from 'next/server';
import { updateChatMetadata } from '@/lib/db';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const phoneNumber = params.id;
        if (!phoneNumber) {
            return NextResponse.json({ error: 'Phone number ID is required' }, { status: 400 });
        }

        const updates = await request.json();

        await updateChatMetadata(phoneNumber, updates);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('Error updating chat API:', error);
        return NextResponse.json({ error: 'Failed to update chat' }, { status: 500 });
    }
}
