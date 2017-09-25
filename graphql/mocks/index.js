import faker from 'faker';
import { MockList } from 'graphql-tools';

export default {
  User: () => ({
    id: faker.random.uuid,
    username: faker.internet.userName,
    email: faker.internet.email,
    isAdmin: false,
    createdAt: faker.date.recent(3),
    posts: () => new MockList(5, () => ({
        id: faker.random.uuid,
        userId: faker.random.uuid,
        caption: faker.lorem.words,
        media: () => ({ src: faker.image.food, mediaType: 'IMAGE' }),
        comments: new MockList(5, () => ({
          content: faker.lorem.words,
          creator: () => ({
            id: faker.random.uuid,
            username: faker.internet.userName,
            email: faker.internet.email,
          })
        })),
        createdAt: faker.date.recent(3),
      })
    )
  })
}