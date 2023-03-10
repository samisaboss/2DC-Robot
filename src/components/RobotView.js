import React, { useState, useEffect } from 'react';
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
import { getRobot, deleteRobot } from '../functions/utils';

export const RobotView = props => {
    const navigate = useNavigate();
    const [robot, setRobot] = useState({
        id: '', 
        name: '', 
        purpose: '', 
        avatar: {
            url: 'https://api.dicebear.com/5.x/bottts-neutral/svg',
            svg: ''
        }
    });
    const { botId } = useParams();

    useEffect(() => {
        const bot = getRobot(botId);
        if( bot ){
            setRobot(bot);
        }else{
            navigate('/');
        }
    }, [botId, navigate]);

    const handleDelete = () => {
        if( deleteRobot(botId, setRobot) ){
            navigate('/');
        }else{
            alert('Delete Failed');
        }
    }

    return (
        <section {...props}>
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={robot.avatar.url}
                    alt={robot.name}
                />

                <Stack>
                    <CardBody>
                    <Heading size='md'>{robot.name}</Heading>

                    <Text py='2'>{robot.purpose}</Text>
                </CardBody>

                <CardFooter>
                    <HStack>
                        <Button as={Link} to={`/edit/${botId}`} variant='solid' colorScheme='teal'>
                            Edit
                        </Button>

                        <Button onClick={handleDelete} variant='solid' colorScheme='red'>
                            Delete
                        </Button>
                    </HStack>
                </CardFooter>
                </Stack>
            </Card>
        </section>
    );
};