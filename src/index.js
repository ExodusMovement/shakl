import { Text, TouchableOpacity, View } from 'react-native';

import styled from './styled';

styled.Text = styled(Text);
styled.Touchable = styled(TouchableOpacity, { name: 'styled(Touchable)' });
styled.View = styled(View, { name: 'styled(View)' });

export default styled;
