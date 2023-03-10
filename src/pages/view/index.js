import React from 'react';
import { RobotView } from '../../components/RobotView';
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

export const PageView = props => {
  const { botId } = useParams();

  return (
    <section {...props}>
      <div className='breadcrumb' style={styles.breadcrumb}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to='/'>Headquarter</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as={Link} to={`/view/${botId}`}>Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <RobotView />
    </section>
  );
};
