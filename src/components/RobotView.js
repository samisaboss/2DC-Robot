/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useGetBotQuery, useDeleteBotMutation } from '../features/api/botApi';

import {
    Card, 
    CardBody,
    CardFooter,
    Image, 
    Stack, 
    HStack,
    Button, 
    Heading, 
    Text
} from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export const RobotView = props => {
    const { botId } = useParams();
    const navigate = useNavigate();
    
    const {
        data: bot,
        isFetching, 
        isSuccess,
        isError
    } = useGetBotQuery(botId, {
        refetchOnMountOrArgChange: true,
    });

    const [deleteBot, { isLoading: isDeleting }] = useDeleteBotMutation();

    const handleDelete = (id) => {
        deleteBot(id)
            .then((res) => navigate('/'))
            .catch((error) => console.log(error));
    }

    let content;
    if( isFetching ){
        content = <p>Loading...</p>;
    }else if( isSuccess ){
        content = <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={bot.avatar.url}
                alt={bot.name}
            />

            <Stack>
                <CardBody>
                <Heading size='md'>{bot.name}</Heading>

                <Text py='2'>{bot.purpose}</Text>
            </CardBody>

            <CardFooter>
                <HStack>
                    <Button as={Link} to={`/edit/${botId}`} variant='solid' colorScheme='teal'>
                        Edit
                    </Button>

                    <Button onClick={()=>handleDelete(botId)} isDisabled={isDeleting} isLoading={isDeleting} variant='solid' colorScheme='red'>
                        Delete
                    </Button>
                </HStack>
            </CardFooter>
            </Stack>
        </Card>;
    }else if( isError ){
        content = <p>404 Not found</p>;
    }

    return (
        <section {...props}>
            {content}
        </section>
    );
};