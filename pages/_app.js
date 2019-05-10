import React from 'react';
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";

import App, {Container} from 'next/app';

import Layout from '../layouts/main'


class Application extends App {
    // static async getInitialProps({Component, ctx}) {
    //
    //     // const action = getCategories();
    //     // ctx.store.dispatch(action);
    //
    //     // let pageProps = {};
    //     //
    //     // if (Component.getInitialProps) {
    //     //     pageProps = await Component.getInitialProps(ctx);
    //     // }
    //
    //     const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    //
    //     // Fetch categories from api
    //
    //     // pageProps.categories = await res.json();
    //
    //     return {pageProps: pageProps};
    // };


    render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Container>

                <Layout {...pageProps}>
                    <Component {...pageProps} />
                </Layout>

            </Container>
        );
    }
}

export default Application;
