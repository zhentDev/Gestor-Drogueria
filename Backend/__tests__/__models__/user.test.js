// __tests__/models/user.model.test.js
const { Sequelize } = require('sequelize');

let sequelize;
let User;

beforeAll(async () => {
  jest.resetModules();

  // Base de datos in-memory
  sequelize = new Sequelize('sqlite::memory:', { logging: false });

  // Mockea tu config/database
  jest.doMock('../../config/database', () => sequelize);

  // Importa el modelo después del mock
  User = require('../../models/user.model');

  // Sincroniza tablas
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
  jest.resetModules();
});

describe('Modelo User', () => {
  test('crea un usuario válido', async () => {
    const u = await User.create({
      username: 'maicol',
      email: 'maicol@example.com',
      password: 'secret123',
      full_name: 'Maicol Fontecha'
    });

    expect(u.id).toBeDefined();
    expect(u.role).toBe('seller');   // valor por defecto
    expect(u.is_active).toBe(true);  // valor por defecto
    expect(u.last_login).toBeNull();
  });

  describe('validaciones de email', () => {
    test('falla con formato inválido', async () => {
      await expect(User.create({
        username: 'bademail',
        email: 'not-an-email',
        password: 'pass',
        full_name: 'Bad Email'
      })).rejects.toThrow();
    });

    test('no permite duplicados', async () => {
      await User.create({
        username: 'uniqueA',
        email: 'dup@example.com',
        password: 'pass',
        full_name: 'User A'
      });

      await expect(User.create({
        username: 'uniqueB',
        email: 'dup@example.com',
        password: 'pass',
        full_name: 'User B'
      })).rejects.toThrow();
    });
  });

  describe('validaciones de username', () => {
    test('falla si es null', async () => {
      await expect(User.create({
        username: null,
        email: 'nulluser@example.com',
        password: 'pass',
        full_name: 'Null User'
      })).rejects.toThrow();
    });

    test('no permite duplicados', async () => {
      await User.create({
        username: 'repeated',
        email: 'rep1@example.com',
        password: 'pass',
        full_name: 'Rep 1'
      });

      await expect(User.create({
        username: 'repeated',
        email: 'rep2@example.com',
        password: 'pass',
        full_name: 'Rep 2'
      })).rejects.toThrow();
    });
  });

  describe('validaciones de password', () => {
    test('se guarda hasheada y valida correctamente', async () => {
      const plain = 'mypassword';
      const u = await User.create({
        username: 'hash',
        email: 'hash@example.com',
        password: plain,
        full_name: 'Hash Test'
      });

      expect(u.password).not.toBe(plain);
      expect(await u.validatePassword(plain)).toBe(true);
      expect(await u.validatePassword('wrong')).toBe(false);
    });

    test('se re-hashea al actualizar', async () => {
      const u = await User.create({
        username: 'update',
        email: 'update@example.com',
        password: 'oldpass',
        full_name: 'Update Test'
      });

      const oldHash = u.password;
      u.password = 'newpass';
      await u.save();

      expect(u.password).not.toBe(oldHash);
      expect(await u.validatePassword('newpass')).toBe(true);
    });
  });

  describe('validaciones de role', () => {
    test('acepta valores válidos', async () => {
      const admin = await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: 'pass',
        full_name: 'Admin User',
        role: 'admin'
      });

      expect(admin.role).toBe('admin');
    });

    test('falla con valor inválido', async () => {
      await expect(User.create({
        username: 'invalidrole',
        email: 'invalidrole@example.com',
        password: 'pass',
        full_name: 'Invalid Role',
        role: 'superuser'
      })).rejects.toThrow();
    });
  });

  describe('is_active', () => {
    test('es true por defecto y se puede desactivar', async () => {
      const u = await User.create({
        username: 'activeuser',
        email: 'active@example.com',
        password: 'pass',
        full_name: 'Active User'
      });

      expect(u.is_active).toBe(true);

      u.is_active = false;
      await u.save();

      expect(u.is_active).toBe(false);
    });
  });

  describe('last_login', () => {
    test('inicia como null y se puede actualizar', async () => {
      const u = await User.create({
        username: 'loginuser',
        email: 'login@example.com',
        password: 'pass',
        full_name: 'Login User'
      });

      expect(u.last_login).toBeNull();

      const now = new Date();
      u.last_login = now;
      await u.save();

      expect(new Date(u.last_login).getTime()).toBeCloseTo(now.getTime(), -2);
    });
  });
});
