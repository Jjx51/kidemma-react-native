import { View, Text, Image, Platform, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, TYPOGRAPHY } from '@theme';

type Props = {
    title: string;
    icon: any;
};

export const CardContent = ({ title, icon }: Props) => {
    return (
        <>
            <View style={styles.body}>
                <Image source={icon} resizeMode="contain" />
                <Text style={styles.title}>{title}</Text>
            </View>

            <Ionicons
                name={Platform.OS === 'ios' ? 'chevron-forward' : 'arrow-forward'}
                size={30}
                color={COLORS.textDark}
            />
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    title: {
        ...TYPOGRAPHY.bodyLarge,
    },
});