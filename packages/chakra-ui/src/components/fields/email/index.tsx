import React, { ReactNode } from "react";
import { Text, LinkProps, Link } from "@chakra-ui/react";

import { FieldProps } from "src/interfaces/field";

export type EmailFieldProps = FieldProps<ReactNode> & LinkProps;

/**
 * This field is used to display email values. It uses the {@link https://chakra-ui.com/docs/components/typography/text `<Text>` }
 * and {@link https://chakra-ui.com/docs/components/navigation/link `<Link>`} components from Chakra UI.
 *
 */
export const EmailField: React.FC<EmailFieldProps> = ({ value, ...rest }) => {
    return (
        <Text size="md">
            <Link href={`mailto:${value}`} {...rest}>
                {value}
            </Link>
        </Text>
    );
};
