function Logger(reducer) {
    return (prevState, action) => {
        console.group(action.type);
        console.log('prev', prevState);
        const nextState = reducer(prevState, action);
        console.log('next', nextState);
        console.groupEnd();

        return nextState;
    }
}

export default Logger;