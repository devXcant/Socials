import { pinata } from "@/config";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Invalid file upload" }, { status: 400 });
    }

    const uploadData = await pinata.upload.file(file, {
      groupId: "123-123",
    });

    if (!uploadData?.cid) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    const fileUrl = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/files/${uploadData.cid}`;

    return NextResponse.json({ fileUrl }, { status: 200 });
  } catch (e) {
    console.error("Upload Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


