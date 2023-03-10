import React from 'react';
import { RobotForm } from '../../components/RobotForm';
import { Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

const styles = {
  breadcrumb: {
    marginBottom: '1rem'
  }
}

export const PageEdit = props => {
  const { botId } = useParams();

  return (
    <section {...props}>
      <div className='breadcrumb' style={styles.breadcrumb}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to='/'>Headquarter</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as={Link} to={`/edit/${botId}`}>Factory</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <RobotForm action='edit'/>
    </section>
  );
};
