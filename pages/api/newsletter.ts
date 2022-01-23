import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { NextRequest, NextResponse } from 'next/server';

function handler(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    const email = (req.body?.email) as string;

    if (!email || !email.includes)
  }
}

export default handler;
