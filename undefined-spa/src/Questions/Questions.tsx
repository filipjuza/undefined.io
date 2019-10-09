import './Questions.scss';

import { Link, RouteComponentProps } from '@reach/router';
import React, { Fragment } from 'react';

import { QuestionModel } from '../App';

export interface QuestionsProps extends RouteComponentProps {
    questions: QuestionModel[];
}

export default class Questions extends React.Component<QuestionsProps> {
    render() {
        const questions = this.props.questions.map(
            (question: QuestionModel) => {
                return (
                    <article id={question.id} key={question.id}>
                        <Link to={`/question/${question.id}`}>
                            <h2>{question.title}</h2>
                        </Link>
                        <p>{question.content}</p>
                    </article>
                );
            }
        );

        return <Fragment>{questions}</Fragment>;
    }
}
