export const msgTypes = {
  AUTH_FAILED: 'auth failed',
  NETWORK: 'network error',
  CONFLICT: 'conflict error',
  SERVER: 'server error',
};

export const generateMessage = (msg: string) => {
  switch (msg.toLowerCase()) {
    case msgTypes.AUTH_FAILED:
      return {
        type: 'error',
        content:
          'Wrong email address or password. Please check your entries and try again.',
      };

    case msgTypes.NETWORK:
      return {
        type: 'error',
        content:
          'Are you offline?. Please check your internet connection and try again.',
      };

    case msgTypes.CONFLICT:
      return {
        type: 'error',
        content:
          'This email address is already registered. Please try again with a different email address.',
      };

    case msgTypes.SERVER:
      return {
        type: 'error',
        content:
          'Sorry, it is not your fault, it is ours. Please report this error to us.',
      };

    default:
      return {
        type: 'error',
        content: `Ooopss! Something occured > ${msg}`,
      };
  }
};
