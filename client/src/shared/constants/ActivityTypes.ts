export interface ActivityTypeInterface {
  id: number,
  ui: string;
}

export const ActivityTypes = {
  game: {
    id: 0,
    ui: "Game"
  },
  shooting: {
    id: 1,
    ui: "Shooting"
  },
  skills: {
    id: 2,
    ui: "Skills (camp, ball handling, drills, etc)"
  },
  community_service: {
    id: 3,
    ui: "Community Service"
  },
  weight_room: {
    id: 4,
    ui: "Weight Room"
  }
};

