export function newAppError(message: string, status: number) {
  return {
    message,
    status,
  };
};