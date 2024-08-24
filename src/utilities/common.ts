
interface Payload {
    [key: string]: any[];
}

  export const getErrorMessage = (payload: Payload) => {
    let message: string = '';
     if (payload) {
        // eslint-disable-next-line
      for (const [key, value] of Object.entries(payload)) {
        // eslint-disable-next-line
        for (const [index, item] of Object.entries(value)) {
          message += item + "\n";
        }
      }
     }

    return message;
  }