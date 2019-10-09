import './PostAnswer.scss';

import { RouteComponentProps } from '@reach/router';
import React, { ChangeEvent, FormEvent } from 'react';

interface PostAnswerProps extends RouteComponentProps {
    questionId: string;
    postAnswer: Function;
}

interface PostAnswerState {
    content: string;
}

export default class PostAnswer extends React.Component<
    PostAnswerProps,
    PostAnswerState
> {
    constructor(props: PostAnswerProps) {
        super(props);

        this.state = {
            content: ''
        };
    }

    handleContentChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        this.setState({ content: event.target.value });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.props.postAnswer(this.props.questionId, this.state.content);
        this.setState({
            content: ''
        });
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <br />
                    <textarea
                        name="content"
                        value={this.state.content}
                        onChange={e => this.handleContentChange(e)}
                    ></textarea>
                </div>
                <button type="submit">Send it</button>
            </form>
        );
    }
}
