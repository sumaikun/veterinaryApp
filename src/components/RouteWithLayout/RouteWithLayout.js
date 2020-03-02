import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignIn  from  'views/SignIn';
import { connect } from 'react-redux';


class RouteWithLayout extends Component{

  constructor(props)
  {
    super(props)
     
  }



  render(){

    const { layout: Layout, component: Component,  authenticated, ...rest } = this.props;

    let view ;
  
    if(authenticated)
    {
      if(this.props.authState.token != null)
      {
        view =  matchProps => (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        );
      }
      else{
        view =  () => (       
            <SignIn/>      
        );
      }
      
    
      
  
    }else{
      view = matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      );
      
     

    }


    return (
      <Route
        {...rest}
        render={ view }
      />
    );
  }
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

const mapStateToProps = state => {
  return {
    authState: state.auth,  
  };
}

export default  connect(mapStateToProps, null)(RouteWithLayout);


