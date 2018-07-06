import { Text, TouchableOpacity, View } from 'react-native';

import s from './s';

s.Text = s(Text);
s.Touchable = s(TouchableOpacity, { name: 'styled(Touchable)' });
s.View = s(View, { name: 'styled(View)' });

export default s;
