import React from "react"
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonLink from "./ButtonLink"



class MenuButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {anchorEl: null};
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const category = this.props.category;
        return (
            <div key={category.slug}>
                <Button key={"button" + category.slug} aria-owns={open ? category.slug : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}>{category.label}</Button>
                <Menu key={category.slug} id={category.slug} anchorEl={anchorEl}
                      open={open}
                      onClose={this.handleClose}
                      TransitionComponent={Fade}>{category.nodes.map(item => (
                    <MenuItem key={item.slug} onClick={this.handleClose} component={ButtonLink}
                              href={"/posts?parent_slug=" + item.slug} hrefAs={"/" + item.slug + "/"}>
                        {item.label}
                    </MenuItem>))}
                </Menu>
            </div>
        )
    }
}

export default MenuButton;
