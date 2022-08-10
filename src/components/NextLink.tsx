import React, {forwardRef} from "react";
import Link from "next/link";

// NextLink abstraction simplifying the use of next link
export const BaseNextLink = (
	{href, ...rest}: React.ComponentPropsWithoutRef<typeof Link>,
	ref: React.ForwardedRef<HTMLAnchorElement>
) => (
	<Link href={href}>
		<a {...rest} ref={ref} />
	</Link>
);
export const NextLink = forwardRef(BaseNextLink);
