import Immutable from 'immutable';

export default function createReducer(initialState, handlers) {
    return (state = initialState, action) => {
        let nextState = state;
        if (!Immutable.Map.isMap(state) && !Immutable.List.isList(state)) {
            nextState = Immutable.fromJS(state);
        }

        const handler = handlers[action.type];

        if (!handler) {
            return nextState;
        }

        nextState = handler(state, action);

        if (!Immutable.Map.isMap(state) && !Immutable.List.isList(state)) {
            throw new TypeError('Reducers must return Immutable objects.');
        }

        return nextState;
    };
}
