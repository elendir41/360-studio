import { NextRequest, NextResponse } from "next/server";
import { exportToMp4Service } from "~/server/services/export-service";
import createError from "http-errors";

/**
 * Exporter et convertir la vidéo
 */

export const createExport = async (req: NextRequest): Promise<NextResponse> => {
  const formData = await req.formData();
  const videoFile = formData.get('video') as File;
  const fileName = formData.get('fileName') as string;

  if (!videoFile) {
    return new NextResponse(JSON.stringify({ error: 'Fichier vidéo requis' }), { status: 400 });
  }

  if (!fileName) {
    return new NextResponse(JSON.stringify({ error: 'Nom de fichier requis' }), { status: 400 });
  }

  try {
    const fileSignedUrl = await exportToMp4Service(fileName, videoFile);
    return NextResponse.json({
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${fileName}.mp4"`,
      },
      body: {
        fileUrl: fileSignedUrl,
      }
    });
  } catch (error) {
    if (error instanceof createError.HttpError) {
      return new NextResponse(JSON.stringify({ error: error.message }), { status: error.statusCode });
    }

    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
