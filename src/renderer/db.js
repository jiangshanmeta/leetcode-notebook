import Datastore from 'nedb';
import path from 'path';
import {
    remote,
} from 'electron';

export const QuestionDB = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/question.db'),
});

export const TopicDB = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/topic.db'),
});

export const TagDB = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/tag.db'),
});
