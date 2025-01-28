import { Button, TextArea, TextField } from "@radix-ui/themes";
import { CloudUploadIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile Settings</h1>
      <form action="">
        <div className="flex gap-4 items-center">
          <div>
            <div className="bg-gray-400 size-24 rounded-full"></div>
          </div>
          <div>
            <Button variant="surface">
              <CloudUploadIcon />
              Change Avatar
            </Button>
          </div>
        </div>
        <p className="mt-2 font-bold">Username:</p>
        <TextField.Root placeholder="username" />
        <p className="mt-2 font-bold">Name:</p>
        <TextField.Root placeholder="name" />
        <p className="mt-2 font-bold">Subtitle:</p>
        <TextField.Root placeholder="subtitle" />
        <p className="mt-2 font-bold">Bio</p>
        <TextArea />
        <div className="mt-4 flex justify-center">
          <Button variant="solid"> Save Settings </Button>
        </div>
      </form>
    </div>
  );
}
