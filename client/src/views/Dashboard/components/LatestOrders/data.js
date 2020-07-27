import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    email: 'example@example.com',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'parttime'
  },
  {
    id: uuid(),
    email: 'example@example.com',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'fulltime'
  },
  {
    id: uuid(),
    email: 'example@example.com',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'trainee'
  },
  {
    id: uuid(),
    email: 'example@example.com',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'parttime'
  },
  {
    id: uuid(),
    email: 'example@example.com',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'fulltime'
  },
  {
    id: uuid(),
    email: 'example@example.com',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'fulltime'
  }
];
