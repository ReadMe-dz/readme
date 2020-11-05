const generateMessage = (msg: string) => {
  console.log(msg);
  switch (msg.toLowerCase()) {
    case 'auth failed.':
      return 'We couldn’t find an account matching the username and password you entered. Please check your username and password and try again.';

    case 'network error':
      return 'You are offline. Please check your internet connection and try again.';

    default:
      return `Something occured ${msg}`;
  }
};

export default generateMessage;
