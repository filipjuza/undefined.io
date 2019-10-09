import './App.scss';

import { Link, Router } from '@reach/router';
import React from 'react';

import AskQuestion from './AskQuestion/AskQuestion';
import { AnswerModel } from './models/answer.model';
import { QuestionModel } from './models/question.model';
import { VoteDirection } from './models/types.model';
import Question from './Question/Question';
import Questions from './Questions/Questions';

interface AppState {
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
                            content: `That's a great question`,
                            votes: 0
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
            content,
            answers: []
        };

        this.setState(state => {
            return { questions: [...state.questions, newQuestion] };
        });
    }

    postAnswer(questionId: string, content: string) {
        const newAnswer: AnswerModel = {
            id: `${Math.random() * 10000000000000000}`,
            content,
            createdAt: new Date().valueOf(),
            votes: 0
        };

        this.setState(state => {
            const question = state.questions.find(q => q.id === questionId);

            if (question) {
                question.answers.push(newAnswer);
            }

            return state;
        });
    }

    handleVote(
        direction: VoteDirection,
        questionId: string,
        answerId: string
    ): void {
        this.setState(state => {
            const question = state.questions.find(q => q.id === questionId);
            const answer = question
                ? question.answers.find(a => a.id === answerId)
                : null;

            if (answer) {
                answer.votes =
                    direction === 'up' ? answer.votes + 1 : answer.votes - 1;
            }

            return state;
        });
    }

    render() {
        return (
            <React.Fragment>
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
                        postAnswer={(questionId: string, content: string) =>
                            this.postAnswer(questionId, content)
                        }
                        handleVote={(
                            direction: VoteDirection,
                            questionId: string,
                            answerId: string
                        ) => {
                            this.handleVote(direction, questionId, answerId);
                        }}
                    />
                    <AskQuestion
                        path="/ask-question"
                        postQuestion={(title: string, content: string) =>
                            this.postQuestion(title, content)
                        }
                    />
                </Router>
            </React.Fragment>
        );
    }
}
