const asyncWithErrorHandler = async <T>(
  fn: () => Promise<T>,
  errorMessage: string
): Promise<T | null> => {
  try {
    return await fn();
  } catch (error) {
    console.error(errorMessage, error);
    return null;
  }
};

export default asyncWithErrorHandler;
