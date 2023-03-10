import React from 'react';
import {
    Heading, 
    Flex,
    Link
} from '@chakra-ui/react';
import { Link as RRLink } from "react-router-dom";

const styles = {
    header: {
        padding: '15px 0',
        background: 'linear-gradient(to right, #0987A0, #805AD5)', 
        color: '#fff'
    }, 
    container: {
        maxWidth: 1280, 
        margin: '0 auto'
    }
}

export const Header = props => {
    return (
        <header {...props} style={styles.header}>
            <div style={styles.container}>
                <Flex justify='space-between'>
                    <Link as={RRLink} to='/'>
                        <Heading as='h1' size='l'>
                            ROBOT
                        </Heading>
                    </Link>
                </Flex>
            </div>
        </header>       
    );
}