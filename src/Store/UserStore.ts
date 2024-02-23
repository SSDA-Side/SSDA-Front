import { atom } from 'recoil';

export type DassdaUser = {
  nickname: string;
};

export const UserStore = atom<DassdaUser>({
  key: 'user',
  default: {
    nickname: '',
  },
});
