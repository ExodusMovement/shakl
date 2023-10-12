import { View, Text, TouchableOpacity, Image } from 'react-native'

import styled from './styled'

styled.View = styled(View, { name: 'styled(View)' })
styled.Text = styled(Text, { name: 'styled(Text)' })
styled.Image = styled(Image, { name: "styled(Image)" })
styled.Touchable = styled(TouchableOpacity, { name: 'styled(Touchable)' })

export default styled
