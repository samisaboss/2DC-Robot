import React from 'react';
import { RobotForm } from '../../components/RobotForm';
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

export const PageAdd = props => {
  return (
    <section {...props}>
      <div className='breadcrumb' style={styles.breadcrumb}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to='/'>Headquarter</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as={Link} to='/add'>Factory</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <RobotForm />
    </section>
  );
};
