import path from 'path';
import express from 'express';
import ect from 'ect';
import routes from './routes/index';

let app = express();

app.engine('ect', ect({ watch: true, root: __dirname + '/views', ext: '.ect' }).render);
app.set('view engine', 'ect');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

export default app
