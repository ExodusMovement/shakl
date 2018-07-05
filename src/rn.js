import { Text, TouchableOpacity, View } from 'react-native';

import s from '.';

s.Text = s(Text);
s.Touchable = s(TouchableOpacity, { displayName: 'styled(Touchable)' });
s.View = s(View, { displayName: 'styled(View)' });

export default s;
