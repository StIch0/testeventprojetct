import { Endpoints } from '../../services/enums';
import { fetchData } from '../../services/fetchData';
import { EventListItem, Repo } from '../types';

interface OwnProps {
  page: number;
}

interface ResponseProps {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  created_at: string;
  repo: Repo;
}

const getEventList = async ({ page }: OwnProps): Promise<EventListItem[]> => {
  const query = `page=${page}&per_page=25`;
  try {
    const eventList = await fetchData<ResponseProps[]>({
      endpoint: Endpoints.events,
      method: 'GET',
      query
    });
    return eventList.map(
      ({
        actor: {
          avatar_url,
          display_login,
          gravatar_id,
          id: actorId,
          login,
          url
        },
        created_at,
        id,
        repo,
        type
      }) => ({
        actor: {
          avatarUrl: avatar_url,
          displayLogin: display_login,
          gravatarId: gravatar_id,
          id: actorId,
          login,
          url
        },
        createdAt: created_at,
        id,
        repo,
        type
      })
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export default getEventList;
