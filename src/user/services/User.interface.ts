export interface IUserEntity<TEntity> {
  getAll(): Promise<TEntity[]>;
  get(id: string | number): Promise<TEntity>;
  create(createUserInput): Promise<boolean>;
  // update(id: string | number): Promise<TEntity>;
  // delete(id: string | number): Promise<boolean>;
}
