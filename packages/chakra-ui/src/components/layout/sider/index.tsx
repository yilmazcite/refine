import React, { ReactText, useState } from "react";
import {
    BoxProps,
    useColorModeValue,
    FlexProps,
    Box,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    Icon,
    IconButton,
    Text,
    Tooltip,
    Accordion,
    Button,
} from "@chakra-ui/react";

import { HamburgerIcon, SmallAddIcon, SmallCloseIcon } from "@chakra-ui/icons";

import { IconType } from "react-icons";
import {
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useLogout,
    useRouterContext,
    useTitle,
    useTranslate,
} from "@pankod/refine-core";

import { Title as DefaultTitle } from "../title";

import { useMenu } from "@hooks";

interface SidebarProps extends BoxProps {
    onClose: () => void;
    onOpen: () => void;
    collapsed: boolean;
}

export const Sider = ({
    collapsed,
    onClose,
    onOpen,
    ...props
}: SidebarProps) => {
    console.log("collapsed", collapsed);
    return (
        <>
            <SidebarContent
                collapsed={collapsed}
                onClose={onClose}
                display={{ base: "none", md: "block" }}
                onOpen={onOpen}
            />
            <Drawer
                autoFocus={false}
                isOpen={collapsed}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent
                        onOpen={onOpen}
                        collapsed={collapsed}
                        onClose={onClose}
                    />
                </DrawerContent>
            </Drawer>
            <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
        </>
    );
};

export const SidebarContent = ({
    collapsed,
    onClose,
    onOpen,
    ...rest
}: SidebarProps) => {
    const Title = useTitle();

    const RenderToTitle = Title ?? DefaultTitle;

    const t = useTranslate();

    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const isExistAuthentication = useIsExistAuthentication();
    const { mutate: logout } = useLogout();

    const [open, setOpen] = useState<{ [k: string]: any }>(defaultOpenKeys);

    const handleClick = (key: string) => {
        setOpen({ ...open, [key]: !open[key] });
    };

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children, parentName } = item;
            const isOpen = open[route || ""] || false;

            const isSelected = route === selectedKey;
            const isNested = !(parentName === undefined);

            if (children.length > 0) {
                return (
                    <div key={route}>
                        <Tooltip
                            label={label ?? name}
                            placement="right"
                            isDisabled={!collapsed}
                        >
                            <Button
                                onClick={() => {
                                    if (collapsed) {
                                        onClose();
                                        if (!isOpen) {
                                            handleClick(route || "");
                                        }
                                    } else {
                                        handleClick(route || "");
                                    }
                                }}
                                style={{
                                    paddingLeft: isNested ? 4 : 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    style={{
                                        justifyContent: "center",
                                        minWidth: 36,
                                        color: "primary.contrastText",
                                    }}
                                >
                                    {icon ?? <HamburgerIcon />}
                                </Button>
                                <Text
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: isSelected
                                            ? "bold"
                                            : "normal",
                                    }}
                                >
                                    {label}
                                </Text>
                                {!collapsed &&
                                    (isOpen ? (
                                        <SmallCloseIcon />
                                    ) : (
                                        <SmallAddIcon />
                                    ))}
                            </Button>
                        </Tooltip>
                        {!collapsed && (
                            <Accordion
                                /*   index={open[route || ""]} */
                                allowMultiple
                                allowToggle
                            >
                                <Box>
                                    {renderTreeView(children, selectedKey)}
                                </Box>
                            </Accordion>
                        )}
                    </div>
                );
            }

            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                >
                    <Tooltip
                        label={label ?? name}
                        placement="right"
                        isDisabled={!collapsed}
                    >
                        <NavItem
                            route={route}
                            isNested={isNested}
                            isSelected={isSelected}
                            onClose={onClose}
                            key={label}
                            icon={icon}
                        >
                            {label ?? name}
                        </NavItem>
                        {/*  <Link
                            href={route}
                            to={route}
                            selected={isSelected}
                            onClick={() => {
                                onClose();
                            }}
                            style={{
                                pl: isNested ? 4 : 2,
                                py: isNested ? 1.25 : 1,
                                justifyContent: "center",
                            }}
                        >
                            <Box
                                style={{
                                    justifyContent: "center",
                                    minWidth: 36,
                                    color: "primary.contrastText",
                                }}
                            >
                                {icon ?? <HamburgerIcon />}
                            </Box>
                            <Text
                                style={{
                                    fontSize: "14px",
                                    fontWeight: isSelected ? "bold" : "normal",
                                }}
                            >
                                {label}
                            </Text>
                        </Link> */}
                    </Tooltip>
                </CanAccess>
            );
        });
    };

    return (
        <Box
            bg="#2a132e"
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <RenderToTitle collapsed={collapsed} />
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {renderTreeView(menuItems, selectedKey)}
            {/*          {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))} */}
        </Box>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent="flex-start"
            {...rest}
        >
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<HamburgerIcon />}
            />

            <Text
                fontSize="2xl"
                ml="8"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Logo
            </Text>
        </Flex>
    );
};

interface NavItemProps extends FlexProps {
    icon: any;
    route?: string;
    isSelected: boolean;
    children: ReactText;
    onClose: () => void;
    isNested: boolean;
}

const NavItem = ({
    route,
    icon,
    isSelected,
    onClose,
    isNested,
    children,
    ...rest
}: NavItemProps) => {
    const { Link } = useRouterContext();

    return (
        <Link
            href={route}
            to={route}
            selected={isSelected}
            onClick={() => {
                onClose();
            }}
            style={{
                paddingLeft: isNested ? 4 : 2,
                paddingRight: isNested ? 1.25 : 1,
                justifyContent: "center",
            }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                color={"white"}
                _hover={{
                    bg: "cyan.400",
                    color: "white",
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white",
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};
