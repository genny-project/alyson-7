import React from 'react';
import ReactJson from 'react-json-view';
import { Icon, Box, Text, Touchable } from '../../components';
import { Version } from '../../pages';
import TestDisplay from '../../../views/app/test-display';
import store from '../../../redux/store';
import './index.css';

/* Dispatch Action from Gennyteer */
/* store.dispatch(gennyteerDisplay("Hey This is a text!")); */

class DebugDisplay extends React.Component {
  state = {
    minimized: true,
    displayStore: false,
  };

  handleClick = () => {
    this.setState({
      justReRender: true,
    });
  };

  handleMinimize = () => {
    this.setState( state => ({ minimized: !state.minimized }));
    console.log(this.state, 'STATE'); //eslint-disable-line
  };

  handleDisplayStore = () => {
    this.setState({
      displayStore: true,
    });
  };

  render() {
    const { minimized, displayStore } = this.state;

    return (
      <Box
        padding={10}
        backgroundColor="snow"
        overflow="scroll"
        height={minimized ? '90px' : '600px'}
        position="relative"
        borderWidth="1px"
        borderColor="#e3e3e3"
      >
        <Box
          position="absolute"
          right={20}
          cursor="pointer"
          height={40}
        >
          <Touchable
            withFeedback
            onPress={this.handleMinimize}
            height={40}
          >
            {minimized ? (
              <Icon
                name="expand_less"
                color="black"
                cursor="pointer"
              />
            ) : (
              <Icon
                name="expand_more"
                color="black"
                cursor="pointer"
              />
            )}
          </Touchable>
        </Box>
        {minimized ? (
          <Box
            flexDirection="column"
            flexGrow="1"
          >
            <Text size="md">
              {' '}
Expand to View Debug Mode (🐞)
            </Text>

            <TestDisplay />
            <Box marginTop="10px" />
          </Box>
        ) : (
          <pre style={{ width: '900px' }}>
            {/* This component is only being renderd in web,
                also we need pre for code formatting
                Box does'nt do the Job of formatting unicode and strings.
            */}
            <TestDisplay />
            <Box borderRadius={4}>
              <Touchable
                withFeedback
                background="#db7093"
                height="30px"
                color="#db7093"
                width="auto"
                onPress={this.handleClick}
                borderRadius={5}
              >
                <Text
                  color="#fff"
                  text="Re-render page"
                  size="xs"
                />
              </Touchable>
            </Box>

            <Box
              flexDirection="column"
              color="#fff"
              backgroundColor="#fff"
              padding={10}
              marginTop={10}
            >
              <Version />
            </Box>

            <Box
              flexDirection="column"
              color="#fff"
              backgroundColor="#fff"
              padding={10}
              marginTop={10}
            >
              <Box
                flexDirection="column"
                marginTop={20}
              >
                <Text size="md">
Session
                </Text>
              </Box>

              {!minimized ? <ReactJson src={store.getState().rawSession} /> : null}
            </Box>
            <Box
              height={300}
              overflow="scroll"
              overflowY="auto"
              marginTop={10}
              flexDirection="column"
              backgroundColor="#fff"
              padding={10}
            >
              <Text size="md">
Keycloak Session From Redux store
              </Text>
              <ReactJson src={store.getState().keycloak} />
            </Box>
            <Box
              flexDirection="column"
              marginTop={10}
              backgroundColor="#fff"
              padding={10}
            >
              <Text size="md">
Redux Store
              </Text>

              <Box flexDirection="column">
                <Box
                  marginTop={20}
                  borderRadius={5}
                >
                  <Touchable
                    withFeedback
                    background="#db7093"
                    height="30px"
                    color="#db7093"
                    width="auto"
                    onPress={this.handleDisplayStore}
                  >
                    <Text
                      text="Click to Display store"
                      color="#fff"
                    />
                  </Touchable>
                </Box>
                <Box marginTop={10}>
                  {!displayStore ? (
                    <Text size="xs">
Hidden for performance reasons click above button to show
                    </Text>
                  ) : null}
                </Box>
              </Box>
              {displayStore ? (
                <ReactJson
                  src={store.getState()}
                  collapsed
                />
              ) : null}
            </Box>
            <Box
              backgroundColor="#fff"
              padding={10}
              marginTop={20}
              flexDirection="column"
            >
              {store.getState().gennyteerDisplay.data ? (
                <Box flexDirection="column">
                  <Text text="Text from Gennyteeer" />
                  <Text
                    size="xs"
                    text={store.getState().gennyteerDisplay.data}
                  />
                </Box>
              ) : null}
            </Box>
          </pre>
        )}
      </Box>
    );
  }
}

export default DebugDisplay;
