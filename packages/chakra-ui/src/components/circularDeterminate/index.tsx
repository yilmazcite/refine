import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Flex, Text } from "@chakra-ui/react";

type CircularDeterminateProps = {
    undoableTimeout: number;
    message: string;
};

export const CircularDeterminate: React.FC<CircularDeterminateProps> = ({
    undoableTimeout,
    message,
}) => {
    const [progress, setProgress] = useState(100);

    const [timeCount, setTimeCount] = useState(undoableTimeout);

    useEffect(() => {
        const increaseProgress = 100 / undoableTimeout;
        const timer = setInterval(() => {
            setTimeCount((prevProgress) => prevProgress - 1);
            setProgress((prevProgress) => prevProgress - increaseProgress);
        }, 1000);

        if (timeCount === 0) {
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        };
    }, [timeCount]);

    return (
        <Flex>
            <Box style={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress value={progress} />
                <Box
                    style={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text>{timeCount}</Text>
                </Box>
            </Box>
            <Box style={{ marginLeft: "10px" }}>{message}</Box>
        </Flex>
    );
};
