import Datastore from 'nedb';
import path from 'path';
import {
    remote,
} from 'electron';

export const QuestionDB = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/question.db'),
});

export const ThemeDB = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/theme.db'),
});
