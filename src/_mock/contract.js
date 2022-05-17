import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const contract = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  contract_type: sample(['Milestone', 'Fix Rate', 'Monthly']),
  scope_of_work: faker.company.companyName(),
  start_date: faker.date.past(),
  end_date: faker.date.future(),
  currency: sample(['COP', 'USD']),
  payment_rate:sample(['$2000','$3000'])
}));

export default contract;
