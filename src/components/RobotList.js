import React from 'react';
import { remove } from '../features/bot/botSlice';
import { useSelector, useDispatch } from 'react-redux';
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

export const RobotList = props => {
    const bots = useSelector((store) => store.bot.bots);
    const dispatch = useDispatch();

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
                        <Button colorScheme='red' size='xs' onClick={()=>dispatch(remove(bot.id))}>
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