import React from 'react';
import { RobotList } from '../../components/RobotList';
import { Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const styles = {
  breadcrumb: {
    marginBottom: '1rem'
  }
}

export const PageIndex = props => {
  return (
    <section {...props}>
      <div className='breadcrumb' style={styles.breadcrumb}>
        <Breadcrumb>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as={Link} to='/'>Headquarter</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <RobotList />
    </section>
  );
};
