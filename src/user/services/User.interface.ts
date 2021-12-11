export interface IUserEntity<TEntity> {
  getAll(): Promise<TEntity[]>;
  get(id: string | number): Promise<TEntity>;
  create(createUserInput): Promise<boolean>;
}
