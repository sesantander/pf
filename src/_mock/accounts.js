// ----------------------------------------------------------------------
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const accounts = [
  {
    displayName: 'Jaydon Frankie',
    email: 'demo@minimals.cc',
    password: 'password nm b  ',
    id: faker.datatype.uuid(),
    photoURL: '/static/mock-images/avatars/avatar_default.jpg',
    transactions: [2000, 1000, 5000, 2000, 1222, 90],
  },
  {
    displayName: 'Julian Falquez',
    email: 'jfalquezr@gmail.com',
    password: 'admin',
    id: faker.datatype.uuid(),
    photoURL: '/static/mock-images/avatars/avatar_1.jpg',
    transactions: [2000, 1000, 5000, 2000, 1222, 90],
  },
  {
    displayName: 'Jesus Romero',
    email: 'jesus@gmail.com',
    password: 'admin',
    id: faker.datatype.uuid(),
    photoURL: '/static/mock-images/avatars/avatar_4.jpg',
    transactions: [2000, 1000, 5000, 2000, 1222, 90],
  },
];

export default accounts;
