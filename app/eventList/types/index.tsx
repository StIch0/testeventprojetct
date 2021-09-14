type EventListItem = {
  id: string;
  type: string;
  actor: Actor;
  createdAt: string;
  repo: Repo;
};

type Actor = {
  id: number;
  login: string;
  displayLogin: string;
  gravatarId: string;
  url: string;
  avatarUrl: string;
};

type Repo = {
  id: number;
  name: string;
  url: string;
};

export { EventListItem, Actor, Repo };
