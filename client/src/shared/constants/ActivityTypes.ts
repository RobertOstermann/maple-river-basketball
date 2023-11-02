import { PermissionLevels } from "./PermissionLevels";

export interface ActivityTypeInterface {
  id: number;
  ui: string;
  permissionLevel: number;
}

export const ActivityTypes = {
  game: {
    id: 0,
    ui: "Game",
    permissionLevel: PermissionLevels.player.id,
  },
  shooting: {
    id: 1,
    ui: "Shooting",
    permissionLevel: PermissionLevels.player.id,
  },
  skills: {
    id: 2,
    ui: "Skills (camp, ball handling, drills, etc)",
    permissionLevel: PermissionLevels.player.id,
  },
  community_service: {
    id: 3,
    ui: "Community Service",
    permissionLevel: PermissionLevels.player.id,
  },
  weight_room: {
    id: 4,
    ui: "Weight Room",
    permissionLevel: PermissionLevels.player.id,
  },
  bonus: {
    id: 5,
    ui: "Bonus",
    permissionLevel: PermissionLevels.coach.id,
  },
  other_sport: {
    id: 6,
    ui: "Other Sport",
    permissionLevel: PermissionLevels.coach.id,
  },
  honor_roll: {
    id: 7,
    ui: "Honor Roll",
    permissionLevel: PermissionLevels.coach.id,
  }
};
