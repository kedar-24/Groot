export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import Busboy from 'busboy';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const POST = async (req: NextRequest) => {
  return new Promise((resolve, reject) => {
    const headers = Object.fromEntries(req.headers.entries());
    const busboy = Busboy({ headers });

    let uploadPromise: Promise<any>;

    busboy.on('file', (_fieldname, file) => {
      uploadPromise = new Promise((res, rej) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'events', resource_type: 'auto' },
          (err, result) => (err ? rej(err) : res(result))
        );
        file.pipe(stream);
      });
    });

    busboy.on('finish', async () => {
      try {
        const result = await uploadPromise;
        resolve(NextResponse.json({
          success: true,
          public_id: result.public_id,
          url: result.secure_url,
        }));
      } catch (e) {
        resolve(NextResponse.json({ success: false, error: 'Upload failed' }));
      }
    });

    const reader = req.body?.getReader();
    const chunks: Uint8Array[] = [];

    const readChunks = async () => {
      if (!reader) return busboy.end();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      busboy.end(Buffer.concat(chunks));
    };

    readChunks();
  });
};
