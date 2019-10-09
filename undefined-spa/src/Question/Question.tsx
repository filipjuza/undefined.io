import './Question.scss';

import { RouteComponentProps } from '@reach/router';
import React, { Fragment } from 'react';

import { AnswerModel, QuestionModel } from '../App';

export interface QuestionProps extends RouteComponentProps<{ id: string }> {
    getQuestion: Function;
}

export interface QuestionState {
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
        const answers = this.state.question.answers
            ? this.state.question.answers.map((answer: AnswerModel) => {
                  return (
                      <article className="answer" key={answer.id}>
                          <h3>
                              {answer.nickname}
                              <span className="answer__created-at">
                                  {new Date(
                                      answer.createdAt
                                  ).toLocaleDateString()}
                              </span>
                          </h3>
                          <p>{answer.content}</p>
                      </article>
                  );
              })
            : [];

        return (
            <article>
                {this.state.question ? (
                    <Fragment>
                        <h1>{this.state.question.title}</h1>
                        <p>{this.state.question.content}</p>
                        <hr></hr>
                        <h2>Answers</h2>
                        {answers}
                    </Fragment>
                ) : (
                    <Fragment>
                        <p>Question wasn't found</p>
                    </Fragment>
                )}
            </article>
        );
    }
}
