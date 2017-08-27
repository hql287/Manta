// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';

const CardWithStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: .25rem;
  border: 1px solid #f2f3f4;
  margin-bottom: 30px;
`;

const CardBodyWithStyle = styled.div`
  flex: 1 1 auto;
  padding: 1.25rem;
`;

const CardTitleWithStyle = styled.h4`
  margin-bottom: .75rem;
`;

const CardSubtitleWithStyle = styled.h6`
  color: #868e96;
  margin-top: -.375rem;
  margin-bottom: .5rem;
`;

const CardTextWithStyle = styled.p``;

// Components
export const Card = props =>
  <CardWithStyle>
    { props.children }
  </CardWithStyle>;

export const CardBody = props =>
  <CardBodyWithStyle>
    { props.children }
  </CardBodyWithStyle>;

export const CardTitle = props =>
  <CardTitleWithStyle>
    { props.children }
  </CardTitleWithStyle>;

export const CardSubtitle = props =>
  <CardSubtitleWithStyle>
    { props.children }
  </CardSubtitleWithStyle>;

export const CardText = props =>
  <CardTextWithStyle>
    { props.children }
  </CardTextWithStyle>;
