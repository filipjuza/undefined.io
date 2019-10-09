import './Question.scss';

import { RouteComponentProps } from '@reach/router';
import React from 'react';

import { AnswerModel } from '../models/answer.model';
import { QuestionModel } from '../models/question.model';
import PostAnswer from '../PostAnswer/PostAnswer';

interface QuestionProps extends RouteComponentProps<{ id: string }> {
    getQuestion: Function;
    postAnswer: Function;
}

interface QuestionState {
    question: QuestionModel;
}

export default class Question extends React.Component<
    QuestionProps,
    QuestionState
> {
    constructor(props: QuestionProps) {
        super(props);
        this.state = {
            question: this.props.getQuestion(this.props.id)
        };
    }

    render() {
        let answers: JSX.Element[] = [];

        if (this.state.question.answers) {
            answers = this.state.question.answers.map((answer: AnswerModel) => {
                return (
                    <article className="answer" key={answer.id}>
                        <h3>
                            Anon
                            <span className="answer__created-at">
                                {new Date(
                                    answer.createdAt
                                ).toLocaleDateString()}
                            </span>
                        </h3>
                        <p>{answer.content}</p>
                    </article>
                );
            });
        }

        return (
            <article>
                {this.state.question ? (
                    <React.Fragment>
                        <h1>{this.state.question.title}</h1>
                        <p>{this.state.question.content}</p>
                        <hr></hr>
                        <h2>Answers</h2>
                        <PostAnswer
                            questionId={this.state.question.id}
                            postAnswer={(questionId: string, content: string) =>
                                this.props.postAnswer(questionId, content)
                            }
                        />
                        {answers}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <p>Question wasn't found</p>
                    </React.Fragment>
                )}
            </article>
        );
    }
}
