module.exports = {
    routes: [
        {
            page: '/index',
            path: '/'
        },
        {
            page: '/about',
            path: '/about'
        },
        {
            page: '/child_posts',
            path: '/:parent_slug/:slug/'
        },
        {
            page: '/posts',
            path: '/:parent_slug/'
        }
    ],

    // pathMap: {
    //     '/:slug': ({slug}) => ({page: '/posts', query: {slug: slug}}),
    // },

    // exportPathMap: function () {
    //     return {
    //         '/': {page: '/index'},
    //         '/about': {page: '/about'},
    //         '/:id': {page: '/posts'},
    //     }
    // }
};
