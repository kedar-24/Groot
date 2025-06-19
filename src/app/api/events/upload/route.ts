import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { mkdirSync, existsSync } from 'fs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedPaths: string[] = [];
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Basic validation: optional file type/size limit
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        return NextResponse.json({ error: 'File too large' }, { status: 413 });
      }

      const ext = file.name.split('.').pop();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'pptx'];
      if (ext && !allowedExtensions.includes(ext.toLowerCase())) {
        return NextResponse.json({ error: 'Invalid file type' }, { status: 415 });
      }

      const timestamp = Date.now();
      const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const filename = `${timestamp}-${sanitizedFilename}`;
      const path = join(uploadDir, filename);

      await writeFile(path, buffer);
      uploadedPaths.push(`/uploads/${filename}`);
    }

    return NextResponse.json({ success: true, files: uploadedPaths });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 });
  }
}
