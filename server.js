const express = require('express');
const next = require('next');

const dev = process.env.ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();
        // server.get('/', (req, res) => {
        //     console.log(req.params)
        //     app.render(req, res, '/index')
        // });

        server.get('/about', (req, res) => {
            app.render(req, res, '/about')
        });

        server.get('/:parent_slug/:slug/', (req, res) => {
            const actualPage = '/child_posts';
            const queryParams = {parent_slug: req.params.parent_slug, slug: req.params.slug};
            app.render(req, res, actualPage, queryParams)
        });

        server.get('/:parent_slug/', (req, res) => {
            const actualPage = '/posts';
            const queryParams = {parent_slug: req.params.parent_slug};
            app.render(req, res, actualPage, queryParams)
        });

        server.get('*', (req, res) => {
            return handle(req, res)
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1)
    });
