export const insertMessage = message => {
    console.log('inserting message')
    return {
        type: 'INSERT_MESSAGE',
        message,
    };
};

