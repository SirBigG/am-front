import Link from "next/link";
import React from "react";

const ButtonLink = ({className, href, hrefAs, children}) => (
    <Link href={href} as={hrefAs} prefetch>
        <a className={className}>
            {children}
        </a>
    </Link>
);

export default ButtonLink;
