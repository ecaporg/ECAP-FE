import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, getInitials } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin } from "lucide-react";
import { IUser } from "@/types";
import { getUserName } from "@/utils";
import { MAP_TO_STRING } from "@/constants/roles";

type ProfileHeaderProps = {
  user: IUser;
};

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar title={user ? getUserName(user) : ""} className="size-24">
              <AvatarFallback>
                {user
                  ? user.canvas_additional_info?.avatar_url ??
                    getInitials(getUserName(user))
                  : "--"}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
            >
              <Camera />
            </Button>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{getUserName(user)}</h1>
            </div>
            <p className="text-muted-foreground">{MAP_TO_STRING[user.role!]}</p>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {user.email}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {"{ {school name} }"}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Last login: {new Date(user.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <Button disabled>Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
}
