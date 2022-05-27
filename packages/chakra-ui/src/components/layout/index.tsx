import React from "react";
import { LayoutProps } from "@pankod/refine-core";

import {
    Box,
    Drawer,
    DrawerContent,
    useDisclosure,
    useColorModeValue,
    background,
} from "@chakra-ui/react";
import { Sider as DefaultSider } from "./sider";
/* import { Header as DefaultHeader } from "./header"; */

export const Layout: React.FC<LayoutProps> = ({
    children,
    Header,
    Sider,
    Footer,
    OffLayoutArea,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const SiderToRender = Sider ?? DefaultSider;

    /*     const HeaderToRender = Header ?? DefaultHeader; */

    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <SiderToRender
                collapsed={isOpen}
                onClose={onClose}
                onOpen={onOpen}
            />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
};
