import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { getInitials } from '../../utils';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  online?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name = 'HR',
  size = 40,
  online,
}) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      {uri && !imgError ? (
        <Image
          source={{ uri }}
          onError={() => setImgError(true)}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors.primaryMuted,
          }}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: colors.primary,
            },
          ]}
        >
          <Text style={[styles.initials, { fontSize: size * 0.38 }]}>
            {getInitials(name)}
          </Text>
        </View>
      )}

      {online !== undefined && (
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: online ? colors.success : colors.light.textMuted,
              width: Math.max(8, size * 0.25),
              height: Math.max(8, size * 0.25),
              borderRadius: size,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
