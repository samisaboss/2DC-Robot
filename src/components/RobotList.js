import React, { useState, useEffect } from 'react';
import {
    Box,
    TableContainer, 
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th,
    Td, 
    Avatar, 
    HStack, 
    Button
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { deleteRobot } from '../functions/utils';

export const RobotList = props => {
    const [bots, setBots] = useState(JSON.parse( localStorage.getItem('bots') || '[]' ));

    const botsColumns = bots.map(bot => {
        return(
            <Tr key={bot.id}>
                <Td>
                    <Link to={`/view/${bot.id}`}>
                        <HStack align='center'>
                            <Avatar name={bot.name} src={bot.avatar.url} />
                            <span>{bot.name}</span>
                        </HStack>
                    </Link>
                </Td>
                <Td>{bot.purpose}</Td>
                <Td>
                    <HStack spacing='5px'>
                        <Button colorScheme='teal' size='xs' as={Link} to={`/edit/${bot.id}`}>
                            Edit
                        </Button>
                        <Button colorScheme='red' size='xs' onClick={() => deleteRobot(bot.id, setBots)}>
                            Delete
                        </Button>
                    </HStack>
                </Td>
            </Tr>
        )
    });

    return (
        <section {...props}>
            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' mb={6}>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Robot</Th>
                                <Th>Job Description</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>{botsColumns}</Tbody>
                    </Table>
                </TableContainer>
            </Box>

            <Button colorScheme='teal' size='lg' as={Link} to='/add'>Build New Robot</Button>
        </section>
    );
};