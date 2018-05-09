import Immutable from 'immutable';
import { Test } from 'constants/actionTypes';
import createReducer from '../utils/createReducer';

export type TestState = ImmutableMap<{
    title: string;
    isFetching: boolean;
    content: string;
}>;

const testState: TestState = Immutable.Map({
    title: 'test',
    isFetching: false,
    content: ''
});

export default createReducer(testState, {
    [Test.testChangeSuccess](state) {
        return state.set('title', 'world')

    },

    [Test.requestNovel](state) {
        return state.set('isFetching', true)
            .set('content', '');
    },
    [Test.requestNovelSuccess](state, { response }) {
        return state.set('isFetching', false)
            .set('content', response.html);
    },
    [Test.requestNovelFail](state, { error }) {
        return state.set('isFetching', false);
    }
})