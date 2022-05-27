import { List as MantineList, Title as MantineTitle } from "@mantine/core";
import type { MantineProviderProps as MantineBaseProviderProps } from "@mantine/core";
import { List, Title } from "./components";
import { MantineProvider, MantineProviderProps } from "./providers";

export * from "@mantine/core";

export {
    MantineList,
    MantineTitle,
    List,
    Title,
    MantineProvider,
    MantineProviderProps,
    MantineBaseProviderProps,
};

export * from "@mantine/hooks";

export * from "./components";
export * from "./hooks";
export * from "./providers";
