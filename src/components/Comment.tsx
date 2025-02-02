import {  Profile } from "@prisma/client";
import Avatar from "./Avatar";

export default function Comment({
  text,
  authorProfile,
}: {
  text: string;
  authorProfile?: Profile;
}) {
  return (
    <div>
      <div className="flex items-center space-x-4 rounded-lg p-4 bg-gray-50">
        <div>
          <Avatar src={authorProfile?.avatar || ""} />
        </div>

        <div>
          <h3 className="text-2xl font-bold">{authorProfile?.name}</h3>
          <p className="text-gray-500">@{authorProfile?.username}</p>
        </div>
      </div>
      <div>
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
}
