import React from "react";

import dayjs, { ConfigType } from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { FieldProps } from "src/interfaces/field";
import { Text, TextProps } from "@chakra-ui/react";

dayjs.extend(LocalizedFormat);

type DateProps = {
    locales?: string;
    format?: string;
};

export type DateFieldProps = FieldProps<ConfigType> & DateProps & TextProps;

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format and
 * Chakra UI {@link https://chakra-ui.com/docs/components/navigation/link `Text`} component
 */
export const DateField: React.FC<DateFieldProps> = ({
    value,
    format: dateFormat = "L",
    ...rest
}) => {
    return (
        <Text size="md" {...rest}>
            {dayjs(value).format(dateFormat)}
        </Text>
    );
};
