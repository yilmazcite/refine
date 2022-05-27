import React, { ReactChild } from "react";
import { Text, TextProps } from "@chakra-ui/react";

import { FieldProps } from "src/interfaces/field";

function toLocaleStringSupportsOptions() {
    return !!(
        typeof Intl == "object" &&
        Intl &&
        typeof Intl.NumberFormat == "function"
    );
}

export type NumberFieldProps = FieldProps<ReactChild> &
    TextProps & {
        locale?: string | string[];
        options?: Intl.NumberFormatOptions;
    };

/**
 * This field is used to display a number formatted according to the browser locale, right aligned. and uses {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl `Intl`} to display date format.
 *
 */
export const NumberField: React.FC<NumberFieldProps> = ({
    value,
    locale,
    options,
    ...rest
}) => {
    const number = parseFloat(value.toString());

    return (
        <Text size="md" {...rest}>
            {toLocaleStringSupportsOptions()
                ? number.toLocaleString(locale, options)
                : number}
        </Text>
    );
};
