export const createLogger = ({getState}) => (next) => (action) => {
    const console = window.console;
    const prevState = getState();
    const returnValue = next(action);
    const nextState = getState();
    const actionType = String(action.type);
    const message = `action ${actionType}`;
    console.log(`%c prev state`, `color: #9E9E9E`, prevState);
    console.log(`%c action`, `color: #03A9F4`, action);
    console.log(`%c next state`, `color: #4CAF50`, nextState);
    return returnValue;
};

/**********************************************************************/
//TODO -> Let's implement thunk middleware here
/**********************************************************************/
export const thunk = ({dispatch, getState}) => (next) => (action) => {
    return typeof action === 'function' ?
                action(dispatch, getState) : next(action);
};
