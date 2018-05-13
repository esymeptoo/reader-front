import React, {Component} from 'react';
import { connect } from 'react-redux';
import { State } from 'reducers/types';
import {
    testChange,
    requestNovelAction,
    TestChangeCreator,
    RequestNovelActionCreator
} from 'actions/test';
import { TestState } from 'reducers/test'

interface TestProp {
    test: TestState;
}

interface TestDispatch {
    testChange: TestChangeCreator;
    requestNovelAction: RequestNovelActionCreator
}

@(connect(
    (state: State) => ({
        test: state.test
    }),
    {
        testChange,
        requestNovelAction
    }
))
export default class Test extends Component<TestProp & TestDispatch> {
    handleClick = () => {
        this.props.testChange()
    };

    requestNovel = () => {
        this.props.requestNovelAction({
            page: 1,
            pageSize: 10
        });
    };

    render() {
        const { test } = this.props;
        return <div>
            <p>
                {
                    'hello ' + test.get('title')
                }
            </p>
            <button onClick={this.handleClick}>我要改标题</button>
            <p>
                <button onClick={this.requestNovel}>我不管我就要上班看小说</button>
            </p>
            {
                test.get('isFetching') ?
                    <p>正在加载中。。。</p> : null
            }
            <div dangerouslySetInnerHTML={{ __html: test.getIn(['novel', 'title'])}} />
            <div dangerouslySetInnerHTML={{ __html: test.getIn(['novel', 'content'])}} />
        </div>
    }
}