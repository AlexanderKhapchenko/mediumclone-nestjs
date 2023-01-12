import { setSeederFactory } from 'typeorm-extension';
import { hash } from 'bcrypt';
import { UserEntity } from '../../user/user.entity';

export default setSeederFactory(UserEntity, async (faker) => {
  const user = new UserEntity();
  const password = await hash('123', 10);
  user.username = faker.name.firstName().toLowerCase();
  user.password = password;
  user.email = faker.internet.email(user.username);

  return user;
});
