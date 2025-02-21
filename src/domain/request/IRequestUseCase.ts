export interface IRequestUseCase<Input, Output> {
  execute(input: Input): Promise<Output>;
}
