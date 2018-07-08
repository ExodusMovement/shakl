import { View, Text, TouchableOpacity } from 'react-native';

import styled, { ThemeProvider, withTheme } from './styled';

styled.View = styled(View, { name: 'styled(View)' });
styled.Text = styled(Text);
styled.Touchable = styled(TouchableOpacity, { name: 'styled(Touchable)' });

export { styled as default, ThemeProvider, withTheme };
