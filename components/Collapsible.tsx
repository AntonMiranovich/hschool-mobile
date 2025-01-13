import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export function Collapsible({ children, title, themeValue }: PropsWithChildren & { title: string, themeValue: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ThemedView style={themeValue?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={themeValue?.dark ? Colors.light.icon : Colors.dark.icon}
        />
        <ThemedText style={themeValue?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }} type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={[styles.content,themeValue?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }]}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
