import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const invoices = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  invoice: sample(['Milestone', 'April 25th - May 25th', 'Cut', 'Freelance', 'February 1st - February 15th']),
  contractor: faker.company.companyName(),
  payment: sample(['2000$', '3000$', '12000$', '5000$', '6000$', '7000$', '2500$', '1000$', '800$', '22000$']),
  status: sample(['Paid', 'Awaiting payment']),
  download: sample(['Download', 'Not Available']),
}));

export default invoices;
