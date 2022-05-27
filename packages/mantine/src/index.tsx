import {
    List as MantineList,
    Title as MantineTitle,
    MantineProvider as MantineBaseProvider,
    MantineProviderProps as MantineBaseProviderProps,
} from "@mantine/core";
import { List, Title } from "./components";
import { MantineProvider } from "./providers";

export * from "@mantine/core";

export {
    MantineList,
    MantineTitle,
    List,
    Title,
    MantineProvider,
    MantineBaseProvider,
    MantineBaseProviderProps,
};

export * from "@mantine/hooks";

export * from "./components";
export * from "./hooks";
export * from "./providers";
