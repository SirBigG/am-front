import React from 'react'
import Link from 'next/link';

import Typography from "@material-ui/core/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import MenuButton from "../components/MenuItem"
import configs from "../configs/configs";


const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    toolbarMain: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
    },
    mainFeaturedPost: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing.unit * 4,
    },
    mainFeaturedPostContent: {
        padding: `${theme.spacing.unit * 6}px`,
        [theme.breakpoints.up('md')]: {
            paddingRight: 0,
        },
    },
    mainGrid: {
        marginTop: theme.spacing.unit * 3,
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    markdown: {
        padding: `${theme.spacing.unit * 3}px 0`,
    },
    sidebarAboutBox: {
        padding: theme.spacing.unit * 2,
        backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
        marginTop: theme.spacing.unit * 3,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing.unit * 8,
        padding: `${theme.spacing.unit * 6}px 0`,
    },
    container: {
        marginTop: `20px`,
    }
});


class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {categories: [], anchorEl: null};
        if (!props.isServer) {
            fetch(`${configs.api}/api/categories/tree/`).then((res) => {
                return res.json()
            }).then((payload) => {
                this.setState({categories: payload})
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };


    render() {
        const {classes, children} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return (

            <React.Fragment>
                <CssBaseline/>
                <div className={classes.layout}>
                    <Toolbar className={classes.toolbarMain}>
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="left"
                            noWrap
                            className={classes.toolbarTitle}
                            key="logo"
                        >
                            AgroMega
                        </Typography>
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>
                        <Button variant="outlined" size="small">
                            Sign up
                        </Button>
                    </Toolbar>
                    <Toolbar variant="dense" className={classes.toolbarSecondary}>

                        {this.state.categories.map(category => (
                            <MenuButton key={category.slug} category={category} />))}
                    </Toolbar>
                    <main>
                        {/*Main data block*/}
                        <Grid container className={classes.container}>
                            {children}
                        </Grid>
                    </main>
                </div>
                {/* Footer */}

                <footer className={classes.footer}>
                    <Typography variant="h6" align="center" key="about" gutterBottom>
                        <Link href="/about"><a>About</a></Link>
                    </Typography>
                    <Typography variant="h6" key="index" align="center" gutterBottom>
                        <Link href="/"><a>Index</a></Link>
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        Something here to give the footer a purpose!
                    </Typography>
                </footer>
                {/* End footer */}
            </React.Fragment>
        )
    }
}


export default withStyles(styles)(Layout)
