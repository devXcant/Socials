"use client";

import { postEntry } from "@/actions";
import { Button, TextArea } from "@radix-ui/themes";
import { CloudUploadIcon, SendIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Create() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
    const fileInRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

  useEffect(() => {
    if (file) {
      const uploadFile = async () => {
        const data = new FormData();
        data.append("file", file);

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: data,
          });

          if (!response.ok) throw new Error("Upload failed");

          const result = await response.json();
          setImageUrl(result.fileUrl); // Make sure this matches your API response
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

      uploadFile();
    }
  }, [file]);

  return (
      <form className="flex flex-col gap-4 p-4" action={async data => {
          const id = await postEntry(data);
          router.push(`/post/${id}`);
          router.refresh()
      }}>
          <input type="hidden" name="image" value={imageUrl} />
      <div>
        <div className="w-64 min-h-64 p-2 bg-gray-400 rounded-md relative">
          {imageUrl && (
            <Image
              src={imageUrl}
              fill
              alt="Preview"
              className="rounded-md object-cover"
            />
          )}
          {!imageUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <input
                className="hidden"
                type="file"
                ref={fileInRef}
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <Button
                variant="surface"
                type="button"
                onClick={() => fileInRef.current?.click()}
              >
                <CloudUploadIcon /> Choose image
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <TextArea
          name="description"
          className="h-16"
          placeholder="Add photo description..."
        />
      </div>

      <div className="flex mt-4 justify-center">
        <Button type="submit">
          <SendIcon size={14} /> Make Post
        </Button>
      </div>
    </form>
  );
}
