import React from "react";
import { Text, Link, LinkProps, TextProps } from "@chakra-ui/react";

import { FieldProps } from "src/interfaces/field";

export type UrlFieldProps = FieldProps<string | undefined> &
    LinkProps &
    TextProps;

/**
 * This field lets you embed a link. It uses the {@link https://chakra-ui.com/docs/components/typography/text `<Text>` }
 * and {@link https://chakra-ui.com/docs/components/navigation/link `<Link>`} components from Chakra UI.
 * You can pass a URL in its `value` property and you can show a text in its place by passing any `children`.
 *
 */
export const UrlField: React.FC<UrlFieldProps> = ({
    children,
    value,
    ...rest
}) => {
    return (
        <Text size="md">
            <Link href={value} {...rest}>
                {children ?? value}
            </Link>
        </Text>
    );
};
