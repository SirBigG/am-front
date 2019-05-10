import React from 'react'



// const PageWrapper = Comp =>
//     class extends React.Component {
//         /*
//          * We need to use args.ctx here instead of args
//          * See https://github.com/zeit/next.js#custom-document
//          */
//         static async getInitialProps(args) {
//             return {
//                 ua: args.ctx.req
//                     ? args.ctx.req.headers['user-agent']
//                     : navigator.userAgent,
//                 ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null),
//             }
//         }
//
//         render() {
//             const {ua, ...props} = this.props
//             return (
//                 <UserAgentProvider ua={ua}>
//                     <Comp {...props} />
//                 </UserAgentProvider>
//             )
//         }
//     }
//
// class Header extends App {
//     static async getInitialProps({Component, router, ctx}) {
//         let pageProps = {};
//
//
//         if (Component.getInitialProps) {
//             pageProps = await Component.getInitialProps(ctx)
//         }
//
//         /* your own logic */
//
//         return {pageProps}
//     }
// };


class Header extends React.Component {
    static async getInitialState(args) {
        let pageProps = {};


        // if (Component.getInitialProps) {
        //     pageProps = await Component.getInitialProps(ctx)
        // }

        /* your own logic */

        return 0 //{aaa: "wegweg"}
    }

    render() {
        const props = this.props;
        return (<ul>
            <li>aaaa</li>
        </ul>)
    }
}

export default Header
