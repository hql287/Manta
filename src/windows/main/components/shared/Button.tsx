// Libraries
import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface ButtonProps {
  link?: boolean
  danger?: boolean
  onClick?: () => void
  primary?: boolean
  success?: boolean
  children: ReactNode
  block?: boolean
  active?: boolean
}

const ButtonStyle = styled.button<ButtonProps>`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  padding: 4px 15px;
  font-size: 12px;
  text-decoration: none;
  background: #ffffff;
  border: 1px solid #e0e1e1;
  text-transform: uppercase;
  letter-spacing: 1px;
  ${(props) => props.block && `width: 100%;`}
  ${(props) =>
    props.primary &&
    `
    background: #469fe5;
    color: white;
  `}
  ${(props) =>
    props.success &&
    `
    background: #6bbb69;
    color: white;
  `}
  ${(props) =>
    props.danger &&
    `
    background: #EC476E;
    color: white;
  `}
  ${(props) =>
    props.active &&
    `
    background: #F2F3F4;
    color: #4F555C;
  `}
  &:hover {
    cursor: pointer;
    text-decoration: none;
  }
`

const ButtonLinkStyle = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  ${(props) => props.primary && `color: #469fe5;`}
  ${(props) => props.success && `color: #6bbb69;`}
  ${(props) => props.danger && `color: #EC476E;`}
  &:hover {
    cursor: pointer;
  }
`

const ButtonsGroupStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  > button {
    margin: 0 !important;
    border-radius: 0;
    &:first-child {
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
    &:not(:first-child) {
      border-left: 0;
    }
  }
`

export const Button: FC<ButtonProps> = (props) => {
  return props.link ? (
    <ButtonLinkStyle {...props}>{props.children}</ButtonLinkStyle>
  ) : (
    <ButtonStyle {...props}>{props.children}</ButtonStyle>
  )
}

export const ButtonsGroup: FC<{ children: ReactNode }> = ({ children }) => (
  <ButtonsGroupStyle>{children}</ButtonsGroupStyle>
)
