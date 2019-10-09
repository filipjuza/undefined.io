import './AskQuestion.scss';

import { RouteComponentProps } from '@reach/router';
import React, { ChangeEvent, FormEvent } from 'react';

export interface AskQuestionProps extends RouteComponentProps {
    postQuestion: Function;
}

export interface AskQuestionState {
    title: string;
    content: string;
    message: string;
}

export default class AskQuestion extends React.Component<
    AskQuestionProps,
    AskQuestionState
> {
    constructor(props: AskQuestionProps) {
        super(props);

        this.state = {
            title: '',
            content: '',
            message: ''
        };
    }

    handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({ title: event.target.value });
    }

    handleContentChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        this.setState({ content: event.target.value });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.props.postQuestion(this.state.title, this.state.content);
        this.setState({
            title: '',
            content: '',
            message: 'Posted, the question has been.'
        });
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <br />
                    <input
                        name="title"
                        value={this.state.title}
                        onChange={e => this.handleTitleChange(e)}
                    ></input>
                </div>

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
                {this.state.message}
            </form>
        );
    }
}
