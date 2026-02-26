import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import { uploadImage } from '@/lib/storage';
import { adminConsole } from '@/lib/admin-console/console';

export async function OPTIONS() {
    return new NextResponse(null, { status: 200 });
}

/**
 * POST /api/games/[id]/thumbnail
 * Uploads a game thumbnail to GCS under game/thumbnails/ and updates the game via the external API.
 */
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized. Please sign in.' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { permissions: true },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found.' },
                { status: 401 }
            );
        }

        const userPerms = user.permissions.map(p => p.permission);

        if (!hasPermission(user.role, userPerms, PERMISSIONS.GAMES_WRITE)) {
            return NextResponse.json(
                { error: 'Forbidden. You do not have permission to update games.' },
                { status: 403 }
            );
        }

        const { id } = await params;
        const formData = await request.formData();
        const file = formData.get('thumbnail') as File | null;

        if (!file) {
            return NextResponse.json(
                { error: 'No thumbnail file provided' },
                { status: 400 }
            );
        }

        const fileName = file.name;

        // Upload the image to GCS under game/thumbnails/
        const uploadResult = await uploadImage(file, 'game/thumbnails', fileName);

        if (!uploadResult.success || !uploadResult.publicUrl) {
            return NextResponse.json(
                { error: uploadResult.error || 'Failed to upload thumbnail' },
                { status: 500 }
            );
        }

        // Send the actual image file to the external API (it expects a file upload, not a string)
        const updatedGame = await adminConsole.updateGameThumbnail(id, file);

        const relativePath = `game/thumbnails/${fileName}`;

        return NextResponse.json({
            ...updatedGame,
            thumbnail: relativePath,
        });
    } catch (error) {
        console.error('Error uploading game thumbnail:', error);
        return NextResponse.json(
            { error: 'Failed to upload game thumbnail' },
            { status: 500 }
        );
    }
}