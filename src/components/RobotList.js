import React from 'react';
import { useGetBotsQuery, useDeleteBotMutation } from '../features/api/botApi';
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
    const {
        data: bots, 
        isLoading, 
        isSuccess, 
        isError, 
        error
    } = useGetBotsQuery();

    const [deleteBot, { isLoading: isDeleting, originalArgs }] = useDeleteBotMutation();

    const handleDelete = (id) => {
        deleteBot(id);
    }

    let content;
    if( isLoading ){
        content = <Tr><td colSpan={3}>Loading....</td></Tr>;
    }else if( isSuccess ){
        content = bots.map(bot => {
            const isProcessing = isDeleting && originalArgs === bot.id;

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
                            <Button colorScheme='red' size='xs' onClick={()=>handleDelete(bot.id)} isDisabled={isProcessing} isLoading={isProcessing}>
                                Delete
                            </Button>
                        </HStack>
                    </Td>
                </Tr>
            )
        });
    }else if( isError ){
        content = <Tr><td colSpan={3}>{error}</td></Tr>;
    }

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
                        <Tbody>{content}</Tbody>
                    </Table>
                </TableContainer>
            </Box>

            <Button colorScheme='teal' size='lg' as={Link} to='/add'>Build New Robot</Button>
        </section>
    );
};