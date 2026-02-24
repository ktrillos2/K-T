import { NextRequest, NextResponse } from 'next/server';
import { updateChatMetadata } from '@/lib/db';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: phoneNumber } = await params;
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
