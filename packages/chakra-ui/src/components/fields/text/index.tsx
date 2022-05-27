import React, { ReactNode } from "react";

import { Text, TextProps } from "@chakra-ui/react";

import { FieldProps } from "src/interfaces/field";

export type TextFieldProps = FieldProps<ReactNode> & TextProps;

/**
 * This field lets you show basic text. It uses Chakra UI {@link https://chakra-ui.com/docs/components/typography/text `<Text>`} component.
 *
 */
const TextField: React.FC<TextFieldProps> = ({ value, ...rest }) => {
    return (
        <Text size="md" {...rest}>
            {value}
        </Text>
    );
};

export { TextField as TextFieldComponent };
