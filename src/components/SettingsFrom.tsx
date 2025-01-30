"use client";
import { updateProfile } from "@/actions";
import { Profile } from "@prisma/client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { CloudUploadIcon } from "lucide-react";
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
    const fileInRef = useRef<HTMLInputElement>();
    const [file, setFile] = useState<File>();
    useEffect(() => {
if(file){
    const data = new FormData();
    data.set("file", file);
    fetch('/api/files', {
        method: "POST",
        body: data,
    }).then(response => {
        
    })
}
    },[file])
  return (
    <form
      action={async (data: FormData) => {
        await updateProfile(data, userEmail);
        router.push("/profile");
        router.refresh();
      }}
    >
      <div className="flex gap-4 items-center">
        <div>
          <div className="bg-gray-400 size-24 rounded-full"></div>
        </div>
        <div>
          <input type="file" ref={fileInRef}  className="hidden"/>
          <Button
            type="button"
            variant="surface"
                      onClick={() => fileInRef.current?.click()}
                      default-value=""
                      onChange={e => setFile(e.target.files?.[0])}
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
