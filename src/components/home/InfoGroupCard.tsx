import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageSourcePropType,
} from 'react-native';
import { Card } from '../Card';
import { COLORS, TYPOGRAPHY } from '@theme';

type Item = {
title: string;
value: number;
color: string;
icon?: ImageSourcePropType;
onPress?: () => void;
};

type Props = {
title: string;
icon: ImageSourcePropType;
items: Item[];
};

export function InfoGroupCard({
title,
icon,
items,
}: Props) {
return (
    <View style={styles.section}>
    <Card style={styles.card}>
        <View style={styles.header}>
        <Image
            source={icon}
            resizeMode="contain"
            style={styles.icon}
        />

        <Text style={styles.headerTitle}>
            {title}
        </Text>
        </View>
    </Card>

    {items.map(item => (
        <Card
        key={item.title}
        style={styles.card}
        onPress={() => {}}
        >
        <View style={styles.divider} />

        <View style={styles.row}>
            <View style={styles.rowBody}>
            {item.icon && (
                <Image
                source={item.icon}
                resizeMode="contain"
                style={styles.iconSm}
                />
            )}

            <Text
                style={[
                styles.rowTitle,
                { color: item.color },
                ]}
            >
                {item.title}
            </Text>
            </View>

            <Text style={styles.rowValue}>
            {item.value}
            </Text>
        </View>
        </Card>
    ))}
    </View>
);
}

const styles = StyleSheet.create({
section: {
    marginVertical: 10,
},

card: {
    padding: 0,
    borderRadius: 0,
},

header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
},

icon: {
    width: 34,
    height: 34,
},

iconSm: {
    width: 28,
    height: 28,
},

headerTitle: {
    ...TYPOGRAPHY.bodyLarge,
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
},

divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
},

row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
},

rowBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
},

rowTitle: {
    fontSize: 16,
    fontWeight: '700',
},

rowValue: {
    fontSize: 18,
    color: COLORS.textDark,
},
});