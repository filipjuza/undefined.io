import './App.scss';

import { Link, Router } from '@reach/router';
import React, { Fragment } from 'react';

import AskQuestion from './AskQuestion/AskQuestion';
import Question from './Question/Question';
import Questions from './Questions/Questions';

export interface AnswerModel {
    id: string;
    createdAt: number;
    content: string;
    nickname?: string;
}

export interface QuestionModel {
    id: string;
    title: string;
    content: string;
    answers?: AnswerModel[];
}

export interface AppState {
    questions: QuestionModel[];
}

export default class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            questions: [
                {
                    id: 'asduipcha',
                    title: 'Should you read the f****** manual?',
                    content: `I'm new here`,
                    answers: [
                        {
                            id: '98ad7ca9ds8c7',
                            createdAt: new Date().valueOf(),
                            nickname: 'legituser64',
                            content: `That's a great question`
                        }
                    ]
                },
                {
                    id: 'iaspduabiag870',
                    title: `What's the difference between null and undefined?`,
                    content: `Great question btw.`,
                    answers: []
                }
            ]
        };
    }

    getQuestion(id: string): QuestionModel | null {
        const question = this.state.questions.find(
            (q: QuestionModel) => q.id === id
        );

        if (question) {
            return question;
        }

        return null;
    }

    postQuestion(title: string, content: string) {
        const newQuestion: QuestionModel = {
            id: `${Math.random() * 10000000000000000}`,
            title,
            content
        };

        this.setState({
            questions: [...this.state.questions, newQuestion]
        });
    }

    render() {
        return (
            <Fragment>
                <h1>undefined.io</h1>
                <nav>
                    <Link to="/">Questions</Link>
                    <br />
                    <Link to="/ask-question">Ask a question</Link>
                </nav>
                <Router>
                    <Questions path="/" questions={this.state.questions} />
                    <Question
                        path="/question/:id"
                        getQuestion={(id: string) => this.getQuestion(id)}
                    />
                    <AskQuestion
                        path="/ask-question"
                        postQuestion={(title: string, content: string) =>
                            this.postQuestion(title, content)
                        }
                    />
                </Router>
            </Fragment>
        );
    }
}
