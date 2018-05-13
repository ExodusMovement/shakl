import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import renderer from 'react-test-renderer';

import styled from '../';

styled.Text = styled(Text);
styled.Touchable = styled(TouchableOpacity);
styled.View = styled(View);

const helper = (description, Component, expectedStyle) =>
  test(description, () => {
    const tree = renderer.create(<Component />).toJSON();
    expect(tree.props.style).toEqual(expectedStyle);
    expect(tree).toMatchSnapshot();
  });

export { styled as s, helper as t };
