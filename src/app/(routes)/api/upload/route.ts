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

    console.log("Uploading file:", file.name, file.size, file.type);

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create FormData for Pinata API
    const formData = new FormData();
    formData.append("file", new Blob([buffer]), file.name);

    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!result?.IpfsHash) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    const fileUrl = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/${result.IpfsHash}`;

    return NextResponse.json({ fileUrl }, { status: 200 });
  } catch (e: unknown) {
    console.error("Upload Error:", e);

    // Ensure we return a proper error message
    const errorMessage =
      e instanceof Error ? e.message : "Internal Server Error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
