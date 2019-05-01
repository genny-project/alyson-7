import React, { Component } from 'react';
import { string, object, func, bool } from 'prop-types';
import { Text, EventTouchable, Icon, Box } from '../../index';
import { isString, isObject } from '../../../../utils';

class InputEvent extends Component {
  static propTypes = {
    color: string,
    question: object,
    parentGroupCode: string,
    rootQuestionGroupCode: string,
    messageType: string,
    iconProps: bool,
    onPress: func,
    icon: string,
    isClosed: bool,
    onChangeState: func,
  }

  state = {
    isHovering: false,
  }

  handleMouseEnter = () => {
    this.setState({
      isHovering: true,
    });

    if ( this.props.onChangeState )
      this.props.onChangeState({ hover: true });
  }

  handleMouseLeave = () => {
    this.setState({
      isHovering: false,
    });

    if ( this.props.onChangeState )
      this.props.onChangeState({ hover: false });
  }

  render() {
    const {
      question,
      messageType,
      parentGroupCode,
      rootQuestionGroupCode,
      icon,
      iconProps,
      onPress, // eslint-disable-line no-unused-vars
      color,
      ...restProps
    } = this.props;
    const { isHovering } = this.state; // eslint-disable-line no-unused-vars

    const hasIcon = isObject( iconProps ) && isString( icon, { ofMinLength: 1 });

    // get eventType from somewhere in the question

    return (
      <EventTouchable
        {...restProps}
        withFeedback
        eventType={messageType}
        code={question.code}
        parentCode={parentGroupCode}
        rootCode={rootQuestionGroupCode}
        flexDirection="row"
        alignItems="center"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        flex={1}
        justifyContent={this.props.isClosed ? 'center' : 'flex-start'}
      >
        { hasIcon
          ? (
            <Box
              paddingRight={5}
            >
              <Icon
                name={icon}
                color="black"
                {...iconProps}
              />
            </Box>
          ) : null
        }
        {
          isString( question.name, { isNotSameAs: ' ' }) && !(
            this.props.isClosed &&
            hasIcon
          )
            ? (
              <Text
                color={color}
                whiteSpace="nowrap"
                text={question.name}
              />
            ) : null
        }

      </EventTouchable>
    );
  }
}

export default InputEvent;
