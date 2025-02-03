"use client"
import { updateProfile } from "@/actions";
import { Profile } from "@prisma/client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { CloudUploadIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SettingsForm({
  userEmail,
  profile,
}: {
  userEmail: string;
  profile: Profile;
}) {
  const router = useRouter();
  const fileInRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar || "");

  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.append("file", file);

      fetch("/api/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then(({ fileUrl, error }) => {
          if (error) {
            console.error("Upload failed:", error);
            return;
          }
          setAvatarUrl(fileUrl);
        })
        .catch((err) => console.error("Upload error:", err));
    }
  }, [file]);

  return (
    <form
      action={async (data: FormData) => {
        data.append("avatar", avatarUrl);
        // await updateProfile(data, userEmail);
        await updateProfile(data);
        router.push("/profile");
        router.refresh();
      }}
      >
          <input type="hidden" name="avatarUrl" value={avatarUrl} />
      <div className="flex gap-4 items-center">
        <div className="bg-gray-400 size-24 rounded-full overflow-hidden shadow-md shadow-gray-400">
          {avatarUrl && (
           <Image
           src={avatarUrl}
           alt="Avatar"
           width={96}
           height={96}
           className="w-full h-full object-cover rounded-full"
         />

          )}
        </div>
        <div>
          <input
            type="file"
            ref={fileInRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button
            type="button"
            variant="surface"
            onClick={() => fileInRef.current?.click()}
          >
            <CloudUploadIcon />
            Change Avatar
          </Button>
        </div>
      </div>
      <p className="mt-2 font-bold">Username:</p>
      <TextField.Root
        name="username"
        placeholder="username"
        defaultValue={profile.username || ""}
      />
      <p className="mt-2 font-bold">Name:</p>
      <TextField.Root placeholder="name" defaultValue={profile.name || ""} />
      <p className="mt-2 font-bold">Subtitle:</p>
      <TextField.Root
        name="subtitle"
        placeholder="subtitle"
        defaultValue={profile.subtitle || ""}
      />
      <p className="mt-2 font-bold">Bio</p>
      <TextArea name="bio" defaultValue={profile.bio || ""} />
      <div className="mt-4 flex justify-center">
        <Button variant="solid"> Save Settings </Button>
      </div>
    </form>
  );
}
