// src/atoms/userState.ts
import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    uid: '',
    name: 'Usuario',
    profileImage: 'avatar.png', // Añadido profileImage con un valor predeterminado
  },
});
